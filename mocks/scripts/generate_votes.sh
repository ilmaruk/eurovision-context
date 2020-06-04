#!/usr/bin/env bash

host="${host:-http://localhost:5000}"
votes="${votes:-1}"

for i in $(seq 1 $votes); do
  email="$(head /dev/urandom | tr -dc A-Za-z | head -c 13 ; echo '')@oracle.com"
  payload="{\"email\":\"${email}\",\"songs\":["

  songs=($(shuf -i 1-11 | tr "\n" " "))
  for (( j=0; j<10; j++ )); do
    payload="${payload}{\"id\":${songs[$j]}}"
    if [[ $j -lt 9 ]]; then
      payload="${payload},"
    fi
  done
  payload="${payload}]}"

  echo "${payload}" | jq
  curl -XPOST -H"content-type:application/json" -d"${payload}" "${host}/vote"
done
