import csv
import math
import random
rows = ["id", "pest", "status", "report_id"]
hama = ["lalat", "tikus", "kecoa", "lainnya"]
allData = []
img= "12/2/1684735629886-0e9ea787-1012-43d2-926c-46a3411a3d7a.jpg"
with open('result_data.txt', mode="w", newline="") as result_csv:
    result_writer = csv.writer(result_csv, delimiter=",")
    result_writer.writerow(rows)
    report_id = 1
    id = 1
    for periodId in range(1, 6):
        data = {
            "lalat": 0,
            "tikus":0,
            "kecoa":0,
            "lainnya": 0
        }
        for reportNum in range(1, 55):
            for num in range (1, 3):
                pest = hama[random.randint(0, 3)]
                data[pest] = data[pest] + 1
                result_writer.writerow([
                    id,
                    pest,
                    2,
                    report_id
                ])
                id+=1
            report_id+=1
        allData.append(data)

with open('images.txt', mode="w") as f:
    result_writer = csv.writer(f, delimiter=",")
    result_writer.writerow(["id", "image_url"])
    for id in range(0, 270*2+1):
        result_writer.writerow([id, img])

with open('statistics.txt', mode="w") as f:
    result_writer = csv.writer(f, delimiter=",")
    result_writer.writerow(hama)
    for data in allData:
        result_writer.writerow([
            data["lalat"],
            data["tikus"],
            data["kecoa"],
            data["lainnya"]
        ])