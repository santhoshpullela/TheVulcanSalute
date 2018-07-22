import os 
import pandas as pd
import numpy as np
import sys

def get_number(message):
    '''
    let's refactor all you number inputs into a simple reusable function
    '''
    while True: 
        try:
            number = input(message)
            number = int(number)
            break
        except ValueError:
            print("Please only enter numbers")

    return number

def get_homeowner():

    yes = set(['y', 'Y', 'ye', 'yes', 'Yes', 'yeah'])
    no = set(['n', 'N', 'no', 'No', 'nope'])

    homeowner = None

    while True:
        homeownerchoice = input("Do you own or intend to own your property by retirement age? (y/n)")
        if homeownerchoice in yes:
            homeowner = True
            break
        elif homeownerchoice in no:
            homeowner = False
            break
        else:
            print ("Please answer yes or no")
    return homeowner

def get_input():
    '''
    could still do this a bit better using dictionary or named tuple, but small
    steps
    '''
    income = get_number("What is your current annual income? ")
    homeowner = get_homeowner()
    if homeowner:
        housecost = get_number("How much does your rent or mortgage cost each month? ")
    else:
        housecost = 0
    bills = get_number("What is the combined monthly cost of your bills, not including Rent or Mortgage? \n(i.e Electric, Gas, Water, Cable, Phone, etc) ")
    userage = get_number("How old are you currently? ")
    retiredage = get_number("At which age do you plan to retire? ")
    pension = get_number("How much do you currently have saved for retirement? (Pension or otherwise) ")
    return income, homeowner, housecost, bills, userage, retiredage, pension



def calculate(inc, hom, hcost, bil, uage, rage, pen):
    ageDiff = rage - uage
    lifeEx = [75, 85, 95]
    retirement =  [(lifeEx[0] - rage), (lifeEx[1] - rage), (lifeEx[2] - rage)]
    lifeBills = [(retirement[0] * (bil + hcost) * 12), (retirement[1] * (bil + hcost) * 12), (retirement[2] * (bil + hcost) * 12)]
    reqMoney = [(lifeBills[0] - pen), (lifeBills[1] - pen), (lifeBills[2] - pen)]

    monthlySave = [((reqMoney[0] / ageDiff) / 12), ((reqMoney[1] / ageDiff) / 12), ((reqMoney[2] / ageDiff) /12)]
    incomePercent = [((monthlySave[0] / inc) * 1200), ((monthlySave[1] / inc) * 1200), ((monthlySave[2] / inc) * 1200)]

    # practice using format
    print("\n Assuming you retire at age", rage, "you will need to save the following, based on how long you live: ")
    x = 0
    for i in lifeEx:
        print ("\nIf you live until", lifeEx[x], "you will need to save an additional", round(reqMoney[x]))
        print ("\nThis means that as of now, you need to save:")
        print(round(monthlySave[x]), "per month, up until you retire")
        print("That is", incomePercent[x], "percent of your annual salary")

        x = x + 1

    print ("\nThis sum does not account for the cost of eating, or travelling or leisure, so you will need save more with that considered.")


def main():
    data = get_input()
    # data is now a tuple.  A named tuple might make life easier
    calculate(*data) # fun way to pass the data using * operator to send tuple
    #as if it were passed piece by piece


if __name__ == '__main__':
    main()