<style>
    /* body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f9f9f9;
        min-height: 100vh;
    } */
  /* @media (min-width: 600px) {
    .dynamic-table {
        right: unset !important;
        position: unset !important;
    }
  } */
    h1 {
        text-align: center;
        margin-bottom: 20px;
    }
    .table-container {
        max-width: 100%;
        padding: 0px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .dynamic-table {
        display: flex;
        flex-wrap: wrap;
        gap: 0px;
        list-style: none;
        padding: 0;
        margin: 0;

        overflow: auto;
        padding-left: 0 !important;
        margin-right: 10px;
    }
    .dynamic-table li {
        padding: 2px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 1 90px; /* Reduced minimum width */
        background-color: #3C3B6E;
    }
    /* li {
        background-color: #3C3B6E;
        color: gray;
        padding-left: 1px;
        padding-right: 1px;
    } */
    .active {
        text-decoration: none;
        color: white;
    }
    .inactive {
        text-decoration: none;
        color: gray;
        pointer-events: none;
        cursor: not-allowed;
    }
    /* a:visited {
        text-decoration: none;
        color: white;
    } */
</style>
<div class="table-container">
    <h1>Inquirita Services in {region}</h1>
    <ul class="dynamic-table">
{localities}
    </ul>
</div>
