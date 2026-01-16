# CHECK IF ENV LOCAL EXIST
if
  [ ! -f .env.local ]
then
  echo -n "::Enter your GITHUB_USERNAME and press [ENTER]: "
  read GITHUB_USERNAME
  echo -n "::Enter your GITHUB_TOKEN and press [ENTER]: "
  read GITHUB_TOKEN

  # CREATE NEEDED RESSOURCES
  echo "GITHUB_TOKEN=$GITHUB_TOKEN \nGITHUB_USERNAME=$GITHUB_USERNAME" > .env.local
  echo "semi: false \ntrailingComma: \"none\" \narrowParens: \"avoid\" \nprintWidth: 150" > .prettierrc.yml
else
  GITHUB_TOKEN=$(grep GITHUB_TOKEN .env.local | cut -d '=' -f2)
  GITHUB_USERNAME=$(grep GITHUB_USERNAME .env.local | cut -d '=' -f2)
fi
