#!/usr/bin/python
from subprocess import Popen,PIPE
import time, os, subprocess
import psutil
import glob
import fnmatch
import subprocess
import shutil
 
if __name__ == '__main__': 
files = [f for f in os.listdir('.') if os.path.isfile(f)]
for f in files:
    print f
print '\n'
os.system(/home/pi/Beeber/Testing/dropboxuploader.sh upload /home/pi/Beeber/Testing/files/ /Pi/Test)

#            files = [f for f in os.listdir('.') if os.path.isfile(f)]
#            for f in files:
#                print f    
#            print '\n'
#            nameOfFile = raw_input("Enter name of file to upload: ")
#            fullDirectory = '/home/pi/Dropbox-Uploader/' + nameOfFile
#            command = '/home/pi/Dropbox-Uploader/dropbox_uploader.sh upload ' + fullDirectory + ' /Apps/PythonUploader/'
