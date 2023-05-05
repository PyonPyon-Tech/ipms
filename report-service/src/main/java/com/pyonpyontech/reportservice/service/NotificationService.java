package com.pyonpyontech.reportservice.service;

import com.pyonpyontech.reportservice.model.Notification;
import com.pyonpyontech.reportservice.model.UserModel;
import com.pyonpyontech.reportservice.model.customer.Customer;
import com.pyonpyontech.reportservice.model.customer.Outlet;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import com.pyonpyontech.reportservice.repository.NotificationDb;
import com.pyonpyontech.reportservice.repository.customer_service_report_db.CsrReportDb;
import org.aspectj.weaver.ast.Not;
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
    private CsrReportDb csrReportDb;

    public void reportCreated(Long reportId){
        // Kasih ke customer dan supervisor
        CsrReport report = csrReportDb.findById(reportId).get();
        Technician technician = report.getTechnician();
        Supervisor supervisor = technician.getSupervisor();
        Outlet outlet = report.getOutlet();
        Customer customer = outlet.getCustomer();
        String technicianName = technician.getUser().getName();
        String outletName = outlet.getName();

        Notification customerNotif = new Notification();
        Notification supervisorNotif = new Notification();

        List<Notification> notifications = new ArrayList<>();
        notifications.add(customerNotif);
        notifications.add(supervisorNotif);
        for(Notification notification: notifications){
            notification.setDate(LocalDate.now());
            notification.setTime(LocalTime.now());
            notification.setTitle("Laporan "+outletName+" Baru Dibuat Oleh Teknisi "+technicianName);
            notification.setTopic("REPORT");
            notification.setBody("");
            notification.setUrl("/reports/detail/"+reportId);
        }
        customerNotif.setUser(customer.getUser());
        supervisorNotif.setUser(supervisor.getUser());

        notificationDb.saveAll(notifications);

    }
}
