import os
import csv

#Obtain the file and make sure that it runs 
csvpath = os.path.join("Resources", "PyBank_data.csv")
print(csvpath)

months = []
net_revenue = []


with open(csvpath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    csvheader = next(csvfile)
    print(f"Header: {csvheader}") 

    for row in csvreader:
        net_revenue.append(int(row[1]))
        months.append(row[0])

        total_months = len(months)  

        greatest_inc = net_revenue[0]
        greatest_dec = net_revenue[0]
        total_profits = 0

        for rowIndex in range(len(net_revenue)):
            net_revenue = [x for x in net_revenue]
        for value in net_revenue:    
            if greatest_inc >= value:
                greatest_inc = net_revenue[rowIndex]
                max_month = months[rowIndex]
                greatest_inc = value
                max_month = months[rowIndex]
            elif net_revenue[rowIndex] <= greatest_dec:
                greatest_dec = net_revenue[rowIndex]
                greatest_dec = value
                lowest_month = months[rowIndex]
            total_profits += net_revenue[rowIndex]

            average_change =(total_profits/total_profits, 2)

output_data = os.path.join('Output', 'pybank_output_' + '.txt')
output = (
    f'Financial Analysis\n'
    f'-----------------------\n'
    f'Total Months: ' + str(total_months) +'\n'
    f'Total Revenue: $'+ sum(net_revenue)  + '\n'
    f'Average Revenue Change: $' + str(average_change) + '\n'
    f'Greatest Increase in Revenue: ' + str(max_month) + (greatest_inc) + '\n'
    f'Greatest Decrease in Revenue: ' + str(lowest_month) + (greatest_dec) + '\n')

with open(output_data, 'w') as txt_file:
    txt_file.write(output)  


            # max_month = ""
# for rowIndex in range(len(net_total))      
# net_total = [ 100,200,300,400,500]
# for value in net_total
#if greatest_inc >= value
#if greatest_inc >= net_total[rowIndex]
# greatest_inc = net_total[rowIndex]
# max_month = list_month[rowIndex]
# greatest_inc = value









        



