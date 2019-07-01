curl \
-F "status=2" \
-F "notify=1" \
-F "ipa=@$1" \
-H "X-HockeyAppToken: $2" \
https://rink.hockeyapp.net/api/2/apps/$3/app_versions/upload