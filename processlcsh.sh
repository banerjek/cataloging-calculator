## processes LOD files from lcsh. Still need to join lines in output file
export LC_ALL=C
fgrep 'subjects/sh' *.nt |fgrep prefLabel | sed 's/^.*subjects\/sh/sh/' |sed 's/--/ -- /g' |sed 's/>.*<.*> "/\t/' | sed 's/"@.*$//' | awk '{print $2,$1}{FS="\t"}{OFS="\t"}' | sed 's/"//g' | sed 's/@/(at)/' | sort -u > goodheadings

echo 'var lcsh="' > lcsh.js
cat goodheadings | tr "\n" "@" >> lcsh.js 
echo '";' >> lcsh.js
cat lcsh.js |tr -d "\n"  > junk
mv junk lcsh.js
