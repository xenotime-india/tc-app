# Login to expo

if [ $EXP_USERNAME ]
then
    yarn run expo login -u $EXP_USERNAME -p $EXP_PASSWORD

    # Deploy to the right release channel
    yarn run expo publish --release-channel $EXP_RELEASE_CHANNEL
fi