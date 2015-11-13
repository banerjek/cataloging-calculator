#!/bin/sh
fgrep 'prefLabelGVP>' AATOut_2Terms.nt  | sed 's/<[^>]*aat\///g' | sed 's/> <[^>]*>//' | sed 's/^<[^>]*term\///' |sed 's/[^0-9 ]//g' |awk '{print $2,$1}' |sort |sed 's/ /\t/' > preflabel

fgrep 'skos-xl#literalForm>' AATOut_2Terms.nt  | fgrep '-en>' | sed 's/^<[^>]*term\///' |sed 's/-en> <[^>]*>/\t/' | sed 's/"@en.*$//' | sed '/[<>]/ d' | sed 's/ *"//' | lang=en_EN sort -k1,1 > terms

join -t "	" preflabel terms > joined 

cat joined | awk '{FS="\t"}{OFS="\t"}{print $2,$3}' |sort -k2 |tr "\n" '@' > aat.js 
