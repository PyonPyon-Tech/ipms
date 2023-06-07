import csv
import random
# Di setiap bulan:
# Buat 0-2 complaint untuk outlet ketiga (id outlet mod 3 = 0)
# Buat 1-5 complaint untuk setiap teknisi, 
# tempatkan di report dengan outlet kedua (id outlet mod 2 = 0)
# hasilnya simpan di statistics.txt

rows = ["id", "content", "date", "is_acknowledged", "time", "customer_id", "outlet_id", "period_id"]
# with open('area_id.txt') as f:
#     while line := f.readline():
#         areas.append(line.strip())
period = ["jan", "feb", "mar", "apr", "may"]

with open('result_data.txt', mode="w", newline="") as result_csv:
    result_writer = csv.writer(result_csv, delimiter=";")
    result_writer.writerow(rows)
    outlet_complaint_by_period = []
    report_complaint_by_period = []
    id = 1
    report_complaint_list = []
    report_id =  0
    for period_id in range(1,6):
        outlet_complaint_by_customer =  [[],[],[],[],[],[],[],[],[]]
        report_complaint_by_customer =  [[],[],[],[],[],[],[],[],[]]
        for customer_id in range(1,10):
            for outlet in range(1,4):
                for visitation in [1,2]:
                    report_id+=1
                    if outlet == 1:
                        continue 
                    chance = random.random()
                    outlet_id = (customer_id-1)*3 + outlet
                    content = "dummy complaint for report"
                    if outlet == 2:
                        if chance > 0.5:
                            continue
                        report_complaint_by_customer[customer_id-1].append(id)
                        report_complaint_list.append([id, report_id])
                        
                    if outlet == 3:
                        if chance > 0.33:
                            continue
                        content = "dummy complaint for outlet"
                        outlet_complaint_by_customer[customer_id-1].append(id)

                    result_writer.writerow([
                        id,
                        content,
                        "2023-"+str(period_id).zfill(2)+"-20",
                        1,
                        "12:00:00",
                        customer_id,
                        outlet_id,
                        period_id
                    ])
                    id+=1
        outlet_complaint_by_period.append(outlet_complaint_by_customer)
        report_complaint_by_period.append(report_complaint_by_customer)

with open("outlet_complaint.txt", mode="w") as f:
    for idx, outlet_complaint in enumerate(outlet_complaint_by_period):
        # Ini bulan
        f.write("Bulan "+period[idx]+": \n")
        for idx, customer in enumerate(outlet_complaint):
            f.write("Customer "+str(idx)+" :"+ ', '.join(str(e) for e in customer)+"\n")
        f.write('\n')

with open("report_complaint.txt", mode="w") as f:
    for idx, report_complaint in enumerate(report_complaint_by_period):
        # Ini bulan
        f.write("Bulan "+period[idx]+": \n")
        for idx, customer in enumerate(report_complaint):
            f.write("Customer "+str(idx)+" :"+ ', '.join(str(e) for e in customer)+"\n")
        f.write('\n')

with open("report_complaint_map.txt", mode="w") as f:
    for x in report_complaint_list:
        f.write("UPDATE `csr_report` SET complaint_id="+str(x[0])+" WHERE id="+str(x[1])+";\n")
