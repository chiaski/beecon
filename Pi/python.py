from picamera import PiCamera
from time import sleep

camera = piCamera()

print "Type name of path to be created, if nonexistent. If existing, will enter directory."
var mypath = raw_input();
if not os.path.isdir(mypath):
   os.makedirs(mypath)

sleep(1)
print "Path created."
sleep(2)

print "Primary directional to be overlayed here."
var direction = raw_input();

with picamera.PiCamera() as camera:
    camera.resolution = (640, 480)
    camera.annotate_text = direction
    //overlay bearings (from readings) in the center of image here.
    for filename in camera.record_sequence(
            '%d.h264' % i for i in range(1, 4)):
        camera.wait_recording(5)
        camera.capture('foo.jpg', use_video_port=True)
        camera.wait_recording(5)


# For run after viewing the files
# this program handles calculations and computations for the estimated distance after review from the images

timel = []
timeavg = 0

def timeComputation():
    try:
      timeval = int(raw_input("Please input a round trip time: Total amount of time back AND forth, not one trip"))
      if not (1 <= timeval <= 20):
        raise ValueError()
    except ValueError:
      print "Please only type an integer."
    else:
      print "Your choice is", timeval
      timel.append(timeval)
      print "Your current time values are: %r" % (timel)

print "Input the amount of times you would like to enter a value."
freepens = int(raw_input())
 
for x in range (0,freepens):
    msg = "This is the #%d run. Remember, we start counting from zero." % (x)
    timeComputation()
    freemamon = freepens - 1
    if x == freemamon:
        break

timeavg = sum(timel) / len(timel)
timeavg = int(timeavg)
print "Average time is ", timeavg
print "The average round trip time is %d" % (timeavg)

sleep(2)


# computation for the radius that results is (timeavg*2)+(timeavg/2)
radiusformula = ((timeavg*2) + (timeavg/2))
# computation for the distance is based on Wenner's formula.
timeformula = (timeavg*150) - 500

print "The calculated distance is %d meters away with a radius of %d" % (timeformula, radiusformula)

sleep(1)
print "Now printing to the file: testingarray.txt"
f = open("testingarray.txt", "w+")
f.write(repr(timel))
f.write("\n" + repr(timeavg)) # Average time
f.write("\n" + repr(timeformula)) #Time formula
f.write("\n" + repr(radiusformula)) #Radius formula
f.close()
print "Printed!"


# Todo: Accuracy meter
# 