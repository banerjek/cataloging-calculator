#!/bin/sh
fgrep 'skos-xl#literalForm>' AATOut_2Terms.nt  | fgrep '-en>' | sed 's/^<[^>]*term\///' |sed 's/-en> <[^>]*>/\t/' | sed 's/"@en.*$//' |sed 's/ *"/	/' | lang=eng_ENG sort > terms


fgrep 'skos-xl#literalForm>' AATOut_2Terms.nt  | fgrep '-en>' | sed 's/^<[^>]*term\///' |sed 's/-en> <[^>]*>/\t/' | sed 's/"@en.*$//' |sed 's/ *"//' | lang=en_EN sort -k1,1 > terms

join -t "	" preflabel terms |awk '{FS="\t"}{OFS="\t"}{print $2,$3}' |sort -k2 |tr "\n" '@' |sed '/[<>]/ d' > aat.js 
