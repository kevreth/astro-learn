branches=("aggregator" "prebuild" "geography" "niches" "app" 'upgrade')
git checkout main
for branch in "${branches[@]}"
do
  git merge $branch
done
git push
for branch in "${branches[@]}"
do
  git checkout $branch
  git merge main
  git push
done
git checkout aggregator
