#!/bin/bash

function usage() {
  echo "Usage: $0 count host port method path [data]"
}

if [ $# -lt 3 ]; then
  usage;
  exit;
fi

COUNT=$1
HOST=$2
PORT=$3
METHOD=$4
API_PATH=$5
DATA=$6

TOTAL=0;

for (( i = 1; i <= $COUNT; i++ )); do
CURL=`curl \
-w "$i: %{time_total} %{http_code} %{url_effective}\n" \
-o "/dev/null" \
-X ${METHOD} http://${HOST}:${PORT}/${API_PATH} \
-H 'Content-Type: application/json' \
-d ${DATA}`
echo $CURL

VALUE=`echo $CURL | cut -f2 -d' '`
TOTAL=`echo "scale=3;${TOTAL}+${VALUE}" | bc`
# sleep .01
done

AVG=`echo "scale=3; ${TOTAL}/${COUNT}" |bc`
RPS=`echo "scale=3; ${COUNT}/${TOTAL}" |bc`
echo "   ________________________________"
echo
echo "   Total Time: $TOTAL s"
echo "   Number of Requests: $COUNT"
echo "   Average Request Time: $AVG s"
echo "   Requests / Second: $RPS"