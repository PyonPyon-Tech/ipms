import csv

rows = ["id", "date", "outlet_id", "period_id", "technician_id", 
        "pic_name", "pic_signature", "technician_signature", 
        "report_type", "time", "visitation_photo", "visitation_type",]
report_type ="1"
visitation_type="1"
pic_signature = "12/2/1684735630533-87879fe6-df94-46d0-8ed5-2d7acdcca0c5.jpeg"
technician_signature = "12/2/1684735629885-b6807f65-5f4b-4b97-a490-9bb4cd2e0a6b.jpeg"
visitation_photo = "12/2/1684735631047-c936fbb9-bb44-4591-97e2-a81d4fccf24a.jpg"
pic_name = "dummy pic"
time = "13:07:00"

with open('result_data.txt', mode="w", newline="") as result_csv:
    result_writer = csv.writer(result_csv, delimiter=",")
    result_writer.writerow(rows)
    report_id = 1
    for period_id in range(1, 6):
        for technician_id in range(1, 4):
            date = 1
            for visitation_number in range(1,3):
                for outlet_id in range(1,10):
                    result_writer.writerow([
                        report_id,
                        str( "2023-0"+str(period_id)+"-"+str(date).zfill(2)),
                        str((technician_id-1)*9 + outlet_id),
                        period_id,
                        technician_id,
                        pic_name,
                        pic_signature,
                        technician_signature,
                        report_type,
                        time,
                        visitation_photo,
                        visitation_type
                       ,
                    ])
                    report_id+=1
                    date +=1
    