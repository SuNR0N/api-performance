COUNT=${1:-10000}

echo Express >> results.txt
cd src/node/js && yarn && yarn start & sleep 5;
./perf.sh ${COUNT} localhost 3000 POST welcome '{"foo":"bar"}' | tail -n6 >> results.txt
pkill -f yarn;
sleep 5;

echo Hapi >> results.txt
cd src/hapi/js && yarn && yarn start & sleep 5;
./perf.sh ${COUNT} localhost 3000 POST welcome '{"foo":"bar"}' | tail -n6 >> results.txt
pkill -f yarn;
sleep 5;

echo Koa >> results.txt
cd src/koa/js && yarn && yarn start & sleep 5;
./perf.sh ${COUNT} localhost 3000 POST welcome '{"foo":"bar"}' | tail -n6 >> results.txt
pkill -f yarn;
sleep 5;

echo LoopBack 3 >> results.txt
cd src/lb3/js && yarn && yarn start & sleep 5;
./perf.sh ${COUNT} localhost 3000 POST welcome '{"foo":"bar"}' | tail -n6 >> results.txt
pkill -f yarn;
sleep 5;

echo LoopBack 4 >> results.txt
cd src/lb4/ts && yarn && yarn start & sleep 5;
./perf.sh ${COUNT} localhost 3000 POST welcome '{"foo":"bar"}' | tail -n6 >> results.txt
pkill -f yarn;
sleep 5;

echo Node >> results.txt
cd src/node/js && yarn start & sleep 5;
./perf.sh ${COUNT} localhost 3000 POST welcome '{"foo":"bar"}' | tail -n6 >> results.txt
pkill -f yarn;
sleep 5;