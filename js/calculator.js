
function displayData(data, startYear, endYear) {
    "use strict";
    var year,
        dataTable = [],
        dataGraph = [];
    for (year = startYear; year <= endYear; year += 1) {
        dataTable[year - startYear] = [
            year,
            data[year].start.toFixed(2),
            data[year].change.toFixed(2),
            data[year].end.toFixed(2)
        ];
        dataGraph[year] = [
            year,
            data[year].start
        ];
    }

    $("#tab-table").empty().append("<table id='outputTable'/>");
    $("#outputTable").dataTable({
        "aaData": dataTable,
        "aoColumns": [
            { "sTitle": "Year" },
            { "sTitle": "Starting Balance" },
            { "sTitle": "Change in Balance" },
            { "sTitle": "Ending Balance" }
        ]
    });
    $("#tab-graph").empty().append("<div id='outputGraph' style='width:100%;height:500px'></div>");
    // we have to select the graph tab because canvas has to be shown to draw on it
    // TODO: get the tab based on name
    //$("#tabs").tabs("select", 2);
    $.plot("#outputGraph", [ dataGraph ]);
}
function computeRetirement(data, yearCurrent, yearRetirement, yearDeath, rate_inflation, rate_capital, cost_retirement, cost_death) {
    "use strict";
    var year;
    for (year = yearDeath; year >= yearRetirement; year -= 1) {
        var total_inflation_growth = Math.pow(1.0 + rate_inflation, year - yearCurrent),
            yearSpending = cost_retirement * total_inflation_growth,
            endOfYear = year === yearDeath ? cost_death * total_inflation_growth : data[year + 1].start / (1.0 + rate_capital),
            startOfYear = endOfYear + yearSpending;
        data[year] = {
            change: -yearSpending,
            end: endOfYear,
            start: startOfYear
        };
    }
    return data;
}
function computeWork(data, yearCurrent, yearRetirement, rate_salary, rate_capital, salary, salary_contribution) {
    "use strict";
    var year;
    for (year = yearRetirement - 1; year >= yearCurrent; year -= 1) {
        var total_salary_growth = Math.pow(1.0 + rate_salary, year - yearCurrent),
            contribution = salary * total_salary_growth * salary_contribution,
            endOfYear = data[year + 1].start / (1.0 + rate_capital),
            startOfYear = endOfYear - contribution;
        data[year] = {
            change: contribution,
            end: endOfYear,
            start: startOfYear
        };
    }
    return data;
}
$(document).ready(function () {
    "use strict";
    
    // TODO: not available in this version of jquery ui
    //$("#tabs").tabs( { heightStyle: "auto" });
    jQuery.validator.addMethod("integer", function (value, element) {
        return this.optional(element) || /^[0-9]+$/.test(value);
    }, "Please specify an integer value.");
    $("#processForm").validate({
        submitHandler: function (form) {
            var ageCurrent = parseInt($("#age_current").val(), 10),
                ageRetirement = parseInt($("#age_retirement").val(), 10),
                ageDeath = parseInt($("#age_death").val(), 10),
                cost_retirement = parseFloat($("#cost_retirement_month").val(), 10) * 12.0,
                cost_death = parseFloat($("#cost_death").val(), 10),
                rate_inflation = parseFloat($("#rate_inflation").val(), 10) / 100.0,
                rate_capital = parseFloat($("#rate_capital").val(), 10) / 100.0,
                salary = parseFloat($("#salary").val(), 10),
                rate_salary = parseFloat($("#rate_salary").val(), 10) / 100.0,
                salary_contribution = parseFloat($("#rate_contribution").val(), 10) / 100.0,
                // compute years
                yearCurrent = new Date().getFullYear(),
                yearRetirement = yearCurrent + (ageRetirement - ageCurrent),
                yearDeath = yearCurrent + (ageDeath - ageCurrent),
                data = [];
            data = computeRetirement(
                data,
                yearCurrent,
                yearRetirement,
                yearDeath,
                rate_inflation,
                rate_capital,
                cost_retirement,
                cost_death
            );
            data = computeWork(
                data,
                yearCurrent,
                yearRetirement,
                rate_salary,
                rate_capital,
                salary,
                salary_contribution
            );
            displayData(data, yearCurrent, yearDeath);
        }
    });
});
