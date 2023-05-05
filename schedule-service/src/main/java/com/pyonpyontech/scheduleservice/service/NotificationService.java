package com.pyonpyontech.scheduleservice.service;

import com.pyonpyontech.scheduleservice.model.Notification;
import com.pyonpyontech.scheduleservice.model.Period;
import com.pyonpyontech.scheduleservice.model.UserModel;
import com.pyonpyontech.scheduleservice.model.customer.Outlet;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import com.pyonpyontech.scheduleservice.model.pest_control.Visitation;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Manager;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Technician;
import com.pyonpyontech.scheduleservice.repository.NotificationDb;
import com.pyonpyontech.scheduleservice.repository.PeriodDb;
import com.pyonpyontech.scheduleservice.repository.customer_db.OutletDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.ScheduleDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.VisitationDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.employee_db.AdministratorDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.employee_db.ManagerDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.employee_db.TechnicianDb;
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

    public void approveSchedule(Long scheduleId){
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
        technicianNotif.setUrl("/schedule/propose/"+schedule.getPeriod().getId());
        notifications.add(technicianNotif);

        List<Manager> managers = managerDb.findAll();
        for(Manager manager: managers){
            Notification managerNotif = new Notification();
            managerNotif.setUser(manager.getUser());
            managerNotif.setUrl("/schedule/"+technician.getId()+"/"+schedule.getId());
            notifications.add(managerNotif);
        }

        List<Administrator> administrators = administratorDb.findAll();
        for(Administrator administrator: administrators){
            Notification adminNotif = new Notification();
            adminNotif.setUser(administrator.getUser());
            adminNotif.setUrl("/schedule/"+technician.getId()+"/"+schedule.getId());
            notifications.add(adminNotif);
        }

        for(Notification notification: notifications){
            notification.setDate(LocalDate.now());
            notification.setTime(LocalTime.now());
            notification.setTitle("Jadwal "+technicianUser.getName()+" untuk "+ bulan+" "+ tahun+" Telah Disetujui");
            notification.setTopic("SCHEDULE-APPROVED");
            notification.setBody("");
            notification.setIsSeen(0);
        }

        notificationDb.saveAll(notifications);
    }

    public void rejectSchedule(Long scheduleId){
        // Ke Teknisi saja
        Schedule schedule = scheduleDb.findById(scheduleId).get();

        Period period = periodDb.findById(schedule.getPeriod().getId()).get();
        String bulan = period.getMonth().name();
        Integer tahun = period.getYear();

        Notification notification = new Notification();
        Technician technician = technicianDb.findById(schedule.getTechnician().getId()).get();
        UserModel technicianUser = technician.getUser();
        notification.setUser(technicianUser);
        notification.setUrl("/schedule/propose/"+schedule.getPeriod().getId());
        notification.setDate(LocalDate.now());
        notification.setTime(LocalTime.now());
        notification.setTitle("Jadwal kamu untuk "+ bulan+" "+ tahun+" Ditolak");
        notification.setTopic("SCHEDULE-REJECTED");
        notification.setBody("");
        notification.setIsSeen(0);
        notificationDb.save(notification);
    }

    public void reallocateVisitation(Visitation visitation, Technician oldTechnician, Technician newTechnician){
        // Ke teknisi saja
        List<Notification> notifications = new ArrayList<>();
        Outlet outlet = outletDb.findById(visitation.getOutlet().getId()).get();
        LocalDate date = visitation.getDate();
        Notification oldTechNotif = new Notification();
        oldTechNotif.setUser(oldTechnician.getUser());
        oldTechNotif.setTitle("Kunjungan Kamu ke "+outlet.getName()+" pada "+date+" Dialihkan");
        notifications.add(oldTechNotif);
        Notification newTechNotif = new Notification();
        newTechNotif.setUser(newTechnician.getUser());
        newTechNotif.setTitle("Kamu Mendapat Kunjungan Tambahan ke "+outlet.getName()+" pada "+date);
        notifications.add(newTechNotif);

        for(Notification notification: notifications){
            notification.setUrl("/schedule/propose/"+visitation.getPeriod().getId());
            notification.setDate(LocalDate.now());
            notification.setTime(LocalTime.now());
            notification.setTopic("SCHEDULE-REALLOCATED");
            notification.setBody("");
            notification.setIsSeen(0);
        }

        notificationDb.saveAll(notifications);
    }
}
