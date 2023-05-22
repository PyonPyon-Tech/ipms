import csv

rows = ["id", "display_number", "finding", "status", "area_id", "report_id"]
findings = []
areas = []
with open('findings.txt') as f:
    while line := f.readline():
        findings.append(line.strip())

with open('area_id.txt') as f:
    while line := f.readline():
        areas.append(line.strip())

print(len(findings))
    
with open('result_data.txt', mode="w", newline="") as result_csv:
    result_writer = csv.writer(result_csv, delimiter=";")
    result_writer.writerow(rows)

    for report_id in range(1, 271):
        for display_number in range(1, 30):
            result_writer.writerow([
                str((report_id-1)*29 + display_number),
                display_number,
                str(findings[display_number-1]),
                "2",
                areas[display_number-1],
                report_id
            ])