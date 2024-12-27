python ${source_dir}/phase0.py
python ${source_dir}/phase1.py
python ${source_dir}/phase2.py providers.csv Code
# execute until zero duplicates found
python ${source_dir}/phase2.py dup.code.csv Code
python ${source_dir}/phase2.py dup.code.csv Phone
# execute until zero duplicates found
python ${source_dir}/phase2.py dup.phone.csv Phone
python ${source_dir}/phase2.py dup.phone.csv URL
# execute until zero duplicates found
python ${source_dir}/phase2.py dup.url.csv URL
python ${source_dir}/phase2.py dup.url.csv Street
# execute until zero duplicates found
python ${source_dir}/phase2.py dup.street.csv Street
# manually
#   * remove any records whose names don't belong to the niche
#       ex.: payroll in cpa, landscaping in tree service
#   * remove any URLs that obviously won't display a company site,
#       ex.: "business.site" or "facebook.com"
#   * remove any records without a locality but whose name indicates the wrong locality
#       ex.: "Naperville Tree Service" for the Aurora locality
#   * combine companies with slightly different names that are likely the same
#       ex.
#          asap.professional.tree.service,ASAP Professional Tree Service,8155190892,,2301 N CENTRAL AVE...
#          asap.tree.pros.inc.,"ASAP Tree Pros, Inc.",,8154945102,2301 N CENTRAL AVE...
#   * remove any records that appear to not service residential customers
#   * remove any records that 
#   * remove any recards that for non-local businesses
#       ex.
#           Home Depot for home services
#           H&R Block for CPAs
#   * remove any records for businesses that primarily sell goods instead of services
#       A business that maintains a storefront for selling products but also installs them should be removed.
#       Every record should be for a primarily service-based business
#   * remove any record where evidence has been found that the business has closed.
#        This includes the death or retirement of the owner.
#        Googling for a business will often show "PERMANENTLY CLOSED" on the right side.
python ${source_dir}/phase3.py dup.street.csv
xdg-open badlinks.html
python ${source_dir}/phase4.py
# STOP HERE if you are not an administrator
scp -P7822 badlinks.html root@inquirita.com:/var/www/html/
xdg-open https://validator.w3.org/checklink
mkdir -p ${deployment_location}
cp content.csv data.yaml ${deployment_location}
