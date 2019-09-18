import os
import csv

csvpath = os.path.join("PyPoll_data.csv") 
print(csvpath)

total_votes = 0
votes = []
candidates = []

winning_candidate = ""
winning_vote = 0
rowIndex = 0

with open(csvpath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    csvheader = next(csvfile)
    print(f"Header {csvheader}")

    print(". ", end="")

    for row in csvreader:
        total_votes = total_votes + 1
        candidate_list = row[2]

    if candidates not in votes:
        votes.append(candidate_list)
        votes = (len(candidate_list))
    

with open(" Election Output", "w") as txt_file:
    election_output = (
    f"Election Results "
    f"------------------------\n"
    f"Total Votes: " + str(total_votes))

print(election_output, end="")


    #The percentage of votes each candidate won
winning_percentage = []
for rowIndex in range(len(candidates)):
    winning_percentage.append((votes[count])/(total_votes) * 100)
    print(winning_percentage)

winning_candidate = []
if votes[rowIndex] > winning_candidate[rowIndex]:
    winning_candidate = votes[rowIndex]
    print(winning_candidate)

    
file = os.path.join('Output', 'pypoll_output' + 'txt.file') 
Output =(

    f' Winning Percentage ' + str(winning_percentage) + '\n'
    f' Winning Candidate ' + str(winning_candidate) + '\n'
)

with open(file, 'w') as txt_file:
    txt_file.write(Output)