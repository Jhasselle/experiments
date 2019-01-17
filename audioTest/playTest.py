import pyaudio
import wave
import sys

CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
RECORD_SECONDS = 5
WAVE_OUTPUT_FILENAME = "output_inverted.wav"

if len(sys.argv) < 2:
    print("Plays a wave file.\n\nUsage: %s filename.wav" % sys.argv[0])
    sys.exit(-1)

wf = wave.open(sys.argv[1], 'rb')

p = pyaudio.PyAudio()

stream = p.open(format=p.get_format_from_width(wf.getsampwidth()),
                channels=wf.getnchannels(),
                rate=wf.getframerate(),
                output=True)

print('*************************')
print('Number of Frames:', wf.getnframes())
print(p.get_format_from_width(wf.getsampwidth()))
print(wf.getnchannels())
print(wf.getframerate())
print('*************************')
print('num of samples:', wf.getsampwidth())

returnString = ''
invertedFrames = []

for i in range(wf.getnframes()):

	# print('At position ', wf.tell())
	data = wf.readframes(1)

	# print('Data (raw): ', data)

	dataInt = int.from_bytes(data, byteorder='little')

	# print('Data (int): ', dataInt)

	#dataInverted = 65535 - dataInt
	dataInverted = dataInt

	# print('Data (inverted): ', dataInverted)
	try:
		dataByte = dataInverted.to_bytes(2, byteorder='little')
	except:
		print(dataInverted)

	invertedFrames.append(dataByte)

	# print('Data (byte): ', dataByte)


data = wf.readframes(CHUNK)
numOfChunks = 1

# while data != '':
#     stream.write(data)
#     data = wf.readframes(CHUNK)
#     numOfChunks += 1
#     #print ('Chunk no.', numOfChunks)
#     if (numOfChunks > 193):
#     	break
wf.close()
p.terminate()


p2 = pyaudio.PyAudio()
streamInverted = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

streamInverted.stop_stream()
streamInverted.close()

wf2 = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
wf2.setnchannels(CHANNELS)
wf2.setsampwidth(p.get_sample_size(FORMAT))
wf2.setframerate(RATE)
wf2.writeframes(b''.join(invertedFrames))
wf2.close()

p2.terminate()
