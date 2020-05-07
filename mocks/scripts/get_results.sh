#!/usr/bin/env bash

host="${host:-http://localhost:9002}"
start=${start:-1}
sleep=${sleep:-1}

next="${host}/results?l=${start}"
while true; do
  results=$(curl -s "${next}")
  votes_used="$(echo "${results}" | jq ".votes_used")"
  votes_total="$(echo "${results}" | jq ".votes_total")"
  echo "Counted ${votes_used} votes out of ${votes_total}"
  echo "Vote by: $(echo "${results}" | jq -r ".last")"
  limit=5
  if [[ $votes_used -eq $votes_total ]]; then
    limit=10
  fi
  for (( s=0; s<limit; s++ )); do
    i=$(( s+1 ))
    echo -n "${i}. $(echo "${results}" | jq -r ".results[$s].song.title") ["
    echo "$(echo "${results}" | jq ".results[$s].points")]"
  done
  echo "===================================="
  if [[ $votes_used -eq $votes_total ]]; then
    break
  fi
  sleep "${sleep}"
  next=$(echo "${results}" | jq -r ".next")
done
echo "AND THE WINNER IS .... $(echo "${results}" | jq -r ".results[0].song.title")"