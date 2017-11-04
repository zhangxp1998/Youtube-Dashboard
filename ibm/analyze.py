# -*- coding: utf-8 -*-

import json
import os
import sys
from os.path import join, dirname
from watson_developer_cloud import ToneAnalyzerV3
# from matplotlib import pyplot as plt
from googletrans import Translator


# Variables
tone_analyzer = ToneAnalyzerV3(
    username='35187b3a-9705-45d1-8e10-5d61c3ae91d3',
    password='DiPjetgprO3i',
    version='2017-09-21')


def main():

    print("Analyzing Text from " + sys.argv[1])
    file_name = sys.argv[1]
    data = []
    with open(file_name, 'r') as f:
        lines = f.readlines()
        size = len(lines)
    process(lines)

def process(lines):
    data = []
    tr = Translator()
    for text in lines:
        text = tr.translate(text).text
        data.append(tone_analyzer.tone(text=text))

    emotive_distribution = {}
    emotive_stats = {}
    for j in data:
        for t in j['document_tone']['tones']:
            if t['tone_name'] not in emotive_stats:
                emotive_stats[t['tone_name']] = t['score']
                emotive_distribution[t['tone_name']] = 1
            else:
                emotive_stats[t['tone_name']] += t['score']
                emotive_distribution[t['tone_name']] += 1
            # for tone in t:
            #     if tone['tone_name'] not in emotive_types:
            #         emotive_types.append(tone['tone_name'])

    sum_emotive = 0
    for key, value in emotive_stats.items():
        sum_emotive += value
    for key, value in emotive_stats.items():
        emotive_stats[key] = emotive_stats[key]/sum_emotive
    print(emotive_stats)
    print()
    print(emotive_distribution)
        # print json.dumps(j, indent=4, sort_keys=True)
    # plt.bar(range(len(emotive_stats)), emotive_stats.values(), align='center')
    # plt.xticks(range(len(emotive_stats)), emotive_stats.keys())
    #
    # plt.show()
    # if len(emotive_stats) == 0:
    #     emotive_stats = 0
    # if len(emotive_distribution) == 0:
    #     emotive_stats = 0
    return {'stats': emotive_stats, 'dist': emotive_distribution}


if __name__ == "__main__":
    main()
