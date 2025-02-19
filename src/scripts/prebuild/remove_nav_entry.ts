// import fs from "fs";
export function removeNavEntry(targetPath: string, data:any): any {
  ["nav1", "nav2"].forEach(key => {
    if (data[key]) data[key] = data[key].filter((item: any) => item.path !== targetPath);
  });
  return data
}
// const targetPath = "/us/ga/decatur/real-estate-agents/about";
// const filePath = "src/astro/pages/us/ga/decatur/real-estate-agents/about/data.json";
// const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
// const data1 = removeNavEntry(targetPath, data);
// fs.writeFileSync(filePath, JSON.stringify(data1, null, 2));