package com.pyonpyontech.customerservice.service;

import com.fasterxml.jackson.databind.AnnotationIntrospector;
import com.pyonpyontech.customerservice.model.Notification;
import com.pyonpyontech.customerservice.model.customer.Complaint;
import com.pyonpyontech.customerservice.model.customer.Customer;
import com.pyonpyontech.customerservice.model.customer.Outlet;
import com.pyonpyontech.customerservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.customerservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.customerservice.model.pest_control.employee.Manager;
import com.pyonpyontech.customerservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.customerservice.model.pest_control.employee.Technician;
import com.pyonpyontech.customerservice.repository.NotificationDb;
import com.pyonpyontech.customerservice.repository.customer_db.CustomerDb;
import com.pyonpyontech.customerservice.repository.customer_db.OutletDb;
import com.pyonpyontech.customerservice.repository.customer_service_report_db.CsrReportDb;
import com.pyonpyontech.customerservice.repository.pest_control.employee_db.AdministratorDb;
import com.pyonpyontech.customerservice.repository.pest_control.employee_db.ManagerDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

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
    private CustomerDb customerDb;
    @Autowired
    private OutletDb outletDb;
    @Autowired
    private CsrReportDb csrReportDb;

    public void complaint(Complaint complaint){
        // ini kasih ke manajer dan administrator
        // result yg hasil save() nampaknya shallow copy dong, jadi customer cm ada id saja
        Customer customer = customerDb.findById(complaint.getCustomer().getId()).get();

        List<Notification> notifications = new ArrayList<>();
        List<Manager> managers = managerDb.findAll();
        for(Manager manager: managers){
            Notification managerNotif = new Notification();
            managerNotif.setUser(manager.getUser());
            notifications.add(managerNotif);
        }

        List<Administrator> administrators = administratorDb.findAll();
        for(Administrator administrator: administrators){
            Notification adminNotif = new Notification();
            adminNotif.setUser(administrator.getUser());
            notifications.add(adminNotif);
        }

        for(Notification notification: notifications){
            notification.setDate(LocalDate.now());
            notification.setTime(LocalTime.now());
            notification.setTitle(customer.getUser().getName()+" Membuat Komplain");
            notification.setUrl("/"); // TODO: Isi ini kalau komplainnya udah jalan
            notification.setTopic("COMPLAINT-GENERAL");
            notification.setBody("");
            notification.setIsSeen(0);
        }

        notificationDb.saveAll(notifications);
    }

    public void complaintReport(Complaint complaint, Long reportId){
        CsrReport report = csrReportDb.findById(reportId).get();
        // ini kalau mau komplain report
        // kasih ke manajer, admin, supervisor dan technician
        Customer customer = customerDb.findById(complaint.getCustomer().getId()).get();
        Outlet outlet = report.getOutlet();
        Technician technician = report.getTechnician();
        Supervisor supervisor = technician.getSupervisor();

        List<Notification> notifications = new ArrayList<>();

        Notification technicianNotif = new Notification();
        technicianNotif.setUser(technician.getUser());
        notifications.add(technicianNotif);

        Notification supervisorNotif = new Notification();
        supervisorNotif.setUser(supervisor.getUser());
        notifications.add(supervisorNotif);

        List<Manager> managers = managerDb.findAll();
        for(Manager manager: managers){
            Notification managerNotif = new Notification();
            managerNotif.setUser(manager.getUser());
            notifications.add(managerNotif);
        }

        List<Administrator> administrators = administratorDb.findAll();
        for(Administrator administrator: administrators){
            Notification adminNotif = new Notification();
            adminNotif.setUser(administrator.getUser());
            notifications.add(adminNotif);
        }

        for(Notification notification: notifications){
            notification.setDate(LocalDate.now());
            notification.setTime(LocalTime.now());
            notification.setTitle(customer.getUser().getName()+" Membuat Komplain Laporan Outlet "+outlet.getName());
            notification.setUrl("/"); // TODO: Isi ini kalau komplainnya udah jalan
            notification.setTopic("COMPLAINT-REPORT");
            notification.setBody("");
            notification.setIsSeen(0);
        }
    }
}
