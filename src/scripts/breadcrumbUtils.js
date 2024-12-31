// Format breadcrumbs by adding ">" symbol
export function formatBreadcrumbs(containerSelector) {
    const breadcrumbItems = document.querySelectorAll(`${containerSelector} li`);

    breadcrumbItems.forEach((item, index) => {
        if (index < breadcrumbItems.length - 1) {
        item.innerHTML += " &gt;&nbsp;"; // Add > symbol with a non-breaking space
        }
    });
}

