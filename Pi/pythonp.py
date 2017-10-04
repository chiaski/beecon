from sys import argv
from time import sleep


timel = []
timeavg = 0

def timeComputation():
    print msg
    timeval = int(raw_input("Please input a round trip value."))
    timel.append(timeval)
    print "Your current time values are: %r" % (timel)

for x in range (0,4):
    msg = "This is the #%d run. Remember, we start counting from zero." % (x)
    timeComputation()
    if x == 4:
        break

timeavg = sum(timel) / float(len(timel))
timeavg = int(round(timeavg))
print "The average round trip time is %d" % (timeavg)

sleep(2)


# computation for the radius that results is (timeavg*2)+(timeavg/2)
radiusformula = ((timeavg*2) + (timeavg/2))
# computation for the distance is based on Wenner
timeformula = (timeavg*150) - 500

print "The calculated distance is %d meters away with a radius of %d" % (timeformula, radiusformula)

sleep(1)
print "Now printing to the file: testingarray.txt"
f = open("testingarray.txt", "w+")
f.write(repr(timel))
f.write("\n" + repr(timeavg))
f.write("\n" + repr(timeformula))
f.write("\n" + repr(radiusformula))
# f.write("\n" + "Average time: " + repr(timeavg))
# f.write("\n" + "Distance: " + repr(timeformula))
# f.write("\n" + "Radius: " + repr(radiusformula))
f.close()
print "Printed!"


# Todo: Accuracy meter
