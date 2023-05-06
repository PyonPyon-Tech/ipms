package com.pyonpyontech.scheduleservice.service;

import com.pyonpyontech.scheduleservice.model.Notification;
import com.pyonpyontech.scheduleservice.model.Period;
import com.pyonpyontech.scheduleservice.model.UserModel;
import com.pyonpyontech.scheduleservice.model.customer.Outlet;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import com.pyonpyontech.scheduleservice.model.pest_control.Visitation;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Manager;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Technician;
import com.pyonpyontech.scheduleservice.repository.NotificationDb;
import com.pyonpyontech.scheduleservice.repository.PeriodDb;
import com.pyonpyontech.scheduleservice.repository.UserDb;
import com.pyonpyontech.scheduleservice.repository.customer_db.OutletDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.ScheduleDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.VisitationDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.employee_db.AdministratorDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.employee_db.ManagerDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.employee_db.TechnicianDb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@Transactional
public class NotificationService {
    @Autowired
    private NotificationDb notificationDb;
    @Autowired
    private ManagerDb managerDb;
    @Autowired
    private AdministratorDb administratorDb;
    @Autowired
    private ScheduleDb scheduleDb;
    @Autowired
    private VisitationDb visitationDb;
    @Autowired
    private PeriodDb periodDb;
    @Autowired
    private TechnicianDb technicianDb;
    @Autowired
    private OutletDb outletDb;
    @Autowired
    private UserDb userDb;

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);


    public void updateSchedule(String username, List<Visitation> visitations){
        logger.info("Update Schedule");
        Visitation visitation = visitationDb.findById(visitations.get(0).getId()).get();
        UserModel changeAuthor = userDb.findByUsername(username).get();
        Schedule schedule = visitation.getSchedule();
        Period period = schedule.getPeriod();

        String bulan = period.getMonth().name();
        Integer tahun = period.getYear();

        Technician technician = schedule.getTechnician();
        Supervisor supervisor = technician.getSupervisor();

        Notification notification = new Notification();
        notification.setDate(LocalDate.now());
        notification.setTime(LocalTime.now());
        notification.setTitle("Jadwal Diupdate");
        notification.setTopic("SCHEDULE-UPDATED");
        notification.setIsSeen(0);

        if(changeAuthor.getRole() == 4){
            // buat notif ke supervisor
            notification.setUser(supervisor.getUser());
            notification.setBody("Teknisi "+technician.getUser().getName()+" mengupdate jadwalnya untuk "+bulan+" "+tahun);
            notification.setUrl("/schedules/"+technician.getId()+"/"+period.getId());
        }else if(changeAuthor.getRole() == 3){
            // buat notif ke teknisi
            notification.setUser(technician.getUser());
            notification.setBody("Supervisor "+supervisor.getUser().getName()+" mengupdate jadwal kamu untuk "+bulan+" "+tahun+". Kunjungan outlet "+ visitation.getOutlet().getName()+" dilakukan pada "+visitation.getDate());
            notification.setUrl("/schedules/propose/"+period.getId());
        }
        Notification res = notificationDb.save(notification);
        logger.info("Saved to "+res.getUser().getName());
    }
    public void approveSchedule(Long scheduleId){
        logger.info("Approve Schedule "+scheduleId);
        // Ke Manajer, Admin, dan teknisi
        Schedule schedule = scheduleDb.findById(scheduleId).get();

        Period period = periodDb.findById(schedule.getPeriod().getId()).get();
        String bulan = period.getMonth().name();
        Integer tahun = period.getYear();
        List<Notification> notifications = new ArrayList<>();

        Notification technicianNotif = new Notification();
        Technician technician = technicianDb.findById(schedule.getTechnician().getId()).get();
        UserModel technicianUser = technician.getUser();
        technicianNotif.setUser(technicianUser);
        technicianNotif.setUrl("/schedules/propose/"+schedule.getPeriod().getId());
        notifications.add(technicianNotif);

        List<Manager> managers = managerDb.findAll();
        for(Manager manager: managers){
            Notification managerNotif = new Notification();
            managerNotif.setUser(manager.getUser());
            managerNotif.setUrl("/schedules/"+technician.getId()+"/"+schedule.getId());
            notifications.add(managerNotif);
        }

        List<Administrator> administrators = administratorDb.findAll();
        for(Administrator administrator: administrators){
            Notification adminNotif = new Notification();
            adminNotif.setUser(administrator.getUser());
            adminNotif.setUrl("/schedules/"+technician.getId()+"/"+schedule.getId());
            notifications.add(adminNotif);
        }

        for(Notification notification: notifications){
            notification.setDate(LocalDate.now());
            notification.setTime(LocalTime.now());
            notification.setTitle("Jadwal telah disetujui!");
            notification.setTopic("SCHEDULE-APPROVED");
            notification.setBody("Jadwal "+technicianUser.getName()+" untuk "+ bulan+" "+ tahun+" Telah Disetujui Oleh "+technician.getSupervisor().getUser().getName());
            notification.setIsSeen(0);
        }

        List<Notification> result = notificationDb.saveAll(notifications);
        logger.info("Saved "+result.size());
    }

    public void createSchedule(Long scheduleId){
        logger.info("Create Schedule "+scheduleId);

        Schedule schedule = scheduleDb.findById(scheduleId).get();
        Technician technician = schedule.getTechnician();
        Supervisor supervisor = technician.getSupervisor();
        Notification notification = new Notification();
        Period period = schedule.getPeriod();
        String bulan = period.getMonth().name();
        Integer tahun = period.getYear();

        notification.setUser(supervisor.getUser());
        notification.setUrl("/schedules/"+technician.getId()+"/"+period.getId());
        notification.setDate(LocalDate.now());
        notification.setTime(LocalTime.now());
        notification.setTitle("Jadwal baru telah dibuat!");
        notification.setTopic("SCHEDULE-CREATED");
        notification.setBody("Teknisi "+technician.getUser().getName() +" Telah Membuat Jadwal untuk " + bulan+" "+ tahun);
        notification.setIsSeen(0);
        Notification result = notificationDb.save(notification);
        logger.info("Saved to "+ result.getUser().getName());
    }

    public void rejectSchedule(Long scheduleId){
        // Ke Teknisi saja
        logger.info("Reject Schedule "+scheduleId);
        Schedule schedule = scheduleDb.findById(scheduleId).get();

        Period period = periodDb.findById(schedule.getPeriod().getId()).get();
        String bulan = period.getMonth().name();
        Integer tahun = period.getYear();

        Notification notification = new Notification();
        Technician technician = technicianDb.findById(schedule.getTechnician().getId()).get();
        UserModel technicianUser = technician.getUser();
        notification.setUser(technicianUser);
        notification.setUrl("/schedules/propose/"+schedule.getPeriod().getId());
        notification.setDate(LocalDate.now());
        notification.setTime(LocalTime.now());
        notification.setTitle("Jadwal Ditolak");
        notification.setTopic("SCHEDULE-REJECTED");
        notification.setBody("Jadwal kamu untuk " + bulan+ " " + tahun+" Ditolak");
        notification.setIsSeen(0);
        Notification result = notificationDb.save(notification);
        logger.info("Saved to "+ result.getUser().getName());
    }

    public void reallocateVisitation(Visitation visitation, Technician oldTechnician, Technician newTechnician){
        // Ke teknisi saja

        List<Notification> notifications = new ArrayList<>();
        Outlet outlet = outletDb.findById(visitation.getOutlet().getId()).get();
        LocalDate date = visitation.getDate();
        Notification oldTechNotif = new Notification();
        oldTechNotif.setUser(oldTechnician.getUser());
        oldTechNotif.setTitle("Realokasi Kunjungan");
        oldTechNotif.setBody("Kunjungan Kamu ke "+outlet.getName()+" pada "+date+" Dialihkan");
        notifications.add(oldTechNotif);
        Notification newTechNotif = new Notification();
        newTechNotif.setUser(newTechnician.getUser());
        newTechNotif.setTitle("Realokasi Kunjugan");
        newTechNotif.setBody("Kamu Mendapat Kunjungan Tambahan ke "+outlet.getName()+" pada "+date);
        notifications.add(newTechNotif);

        for(Notification notification: notifications){
            notification.setUrl("/schedules/propose/"+visitation.getPeriod().getId());
            notification.setDate(LocalDate.now());
            notification.setTime(LocalTime.now());
            notification.setTopic("SCHEDULE-REALLOCATED");
            notification.setIsSeen(0);
        }
        logger.info("Reallocate Schedule "+outlet.getName());
        List<Notification> result = notificationDb.saveAll(notifications);
        logger.info("Saved "+result.size());
    }
}
