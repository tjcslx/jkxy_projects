#!/bin/bash
echo "Bash脚本启动中…"
# Node应用名为app
pm2 start app.js
sleep 5s

# 定义maxCPUPercent为Node进程占用的CPU最高使用率
maxCPUPercent=98

while [[ true ]]
do
	# getProcessId为取得Node运行的进程id
	getProcessId=`ps -e | grep 'node./' | awk '{print $1}'`
	if [[ ! $getProcessId ]]
	then
		echo "pm2启动失败，将于5秒后重新检测"
	else
		# currCPUPercent为Node进程CPU当前使用率，只保留整数位以和maxCPUPercent进行比较；当curr大于等于max时，重启pm2
		currCPUPercent=`ps -p $getProcessId -o pcpu | grep -v CPU | cut -d . -f 1 | awk '{print $1}'`
		echo 'CPU占用率='$currCPUPercent'%'
		if [[ $currCPUPercent -ge $maxCPUPercent ]]
		then
			echo "CPU占用率已大于98%，pm2服务即将重启并于5秒后重新检测"
			pm2 restart app
		else
			echo "CPU占用率正常"
		fi
	fi
	sleep 5s
done
