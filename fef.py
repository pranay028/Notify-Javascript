# flights = "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+Departure;fao93766109;lis2323639855;12:30"

# bigString = flights.split("+")


# # print(string)
# # print("SPlit strign")
# # print(string.split(";"))
# # print("\n \n")


# for string in bigString:
#     [typeof, start, end, time] = string.split(";")
#     # print(type(start))
#     newTypeof = typeof.replace("_", " ")

#     newStart = start[0:3].upper()
#     newEnd = end[0:3].upper()
#     newTime = time.replace(":", "h")

#     tpe = ""
#     if newTypeof.startswith(" Dela"):
#         tpe = ":diamonds:"

#     newString = f"{newTypeof} from {newStart} to {newEnd} ({newTime})"
#     print(newString.rjust(50, "-"))

# Count the number of occurrence of each letter in word "MISSISSIPPI". Store count of every letter with the letter in a dictionary.

word = "MISSISSIPPI"
dictio = {}
inputkey = input("Enter a char: ")
for char in word:
    if char not in dictio.keys():

        dictio[char] = 1
    else:
        dictio[char] += 1
