from picamera import PiCamera
from time import sleep

camera = piCamera()

camera.start_preview()
sleep(30)
camera.stop_preview()
