# Proxy in the environment variables of the build machine
printenv > .env
echo fs.inotify.max_user_instances=524288 | tee -a /etc/sysctl.conf && sysctl -p
echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
echo fs.inotify.max_queued_events=524288 | tee -a /etc/sysctl.conf && sysctl -p
