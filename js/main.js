$(function () {

    // INPUT VARIABLES
    var LCh; //[LED Energy Consumption / Hour]
    var FCh; //[Fluorescent Energy Consumption / Hour]

    //Non light-type INPUT VARIABLES
    var hrs; //[Hours Used / Day] 
    var numRep; //[Number of Tubes Replaced]
    var DPy; //[Days Used / Year]
    var Ec; //[Energy Cost / kWh]

    var FLHrs;
    var LLHrs;

    //COMPLEX INPUT VARIABLES
    var Af; //Age of Fluorescent
    var LL; //LED Lifespan
    var FL; //Fluorescent Lifespan

    var C; //Cost of Single Fluorescent Tube
    var CL; //Cost of a Single LED Tube

    // inits new variables
    function newInputs(LCh1, FCh1, hrs1, numRep1, DPy1, Ec1, Af1, LL1Hrs, FL1Hrs, C1, CL1) {
        LCh = LCh1; //[LED Energy Consumption / Hour]
        FCh = FCh1; //[Fluorescent Energy Consumption / Hour]

        //Non light-type INPUT VARIABLES
        hrs = hrs1; //[Hours Used / Day] 
        numRep = numRep1; //[Number of Tubes Replaced]
        DPy = DPy1; //[Days Used / Year]
        Ec = Ec1; //[Energy Cost / kWh]

        Af = Af1;
        LL = (LL1Hrs / hrs) / (DPy);
        //console.log(LL);
        FL = (FL1Hrs / hrs) / (DPy);
        C = C1;
        CL = CL1;
    }

    //OUTPUT VARIABLES
    var LEy; //Yearly Energy Consumption of LED Tube
    var LCy; //Yearly Energy Cost of LED Tubes

    var FEy; //Yearly Energy Consumption of Fluorescent Tube
    var FCy; //Yearly Energy Cost of Fluorescent Tubes

    var LCEy; //Yearly Carbon Emission of LED Tubes
    var FCEy; //Yearly Carbon Emission of Fluorescent Tubes

    var CESy; //Yearly Carbon Emission Reduction

    //***************************************************** 
    //Variables for more complex calculations.

    //OUTPUT VARIABLES
    var tLR; //Time remaining in LED lifespan after Tr
    var tR; //Time remaining in Fluorescent lifespan
    var Um; //Total Useful Money of a Fluorescent Tube
    var Wm; //Total Wasted Money of a Fluorescent Tube

    //FINAL OUTPUTS
    var ESy; //Yearly Energy Savings for all tubes
    var CSy; //Yearly Cost Savings for all tubes
    var XTCSt; //Total Savings per Tube using Complex Formula
    var XROI; //Complex ROI
    var ROI; // Simple ROI

    function calcFL() {
        FL = (FLHrs / hrs) * (DPy / 365);
        return FL;
    }

    function calcLL() {
        LL = (LLHrs / hrs) * (DPy / 365);
        return LL;
    }


    function calcCSy() {

        //[LED Energy Consumption / Hour] * [0.001 (for kWh conversion)] * [Hours Used / Day] * [Days Used / Year] * [Number of Tubes Replaced]
        //[Fluorescent Energy Consumption / Hour] * [0.001 (for kWh conversion)] * [Hours Used / Day] * [Days Used / Year] * [Number of Tubes Replaced]
        LEy = LCh * 0.001 * hrs * DPy * numRep;
        LCy = Ec * LEy;

        FEy = FCh * 0.001 * hrs * DPy * numRep;
        FCy = Ec * FEy;
        CSy = FCy - LCy;
        return CSy;
    }

    function calcESy() {
        LEy = LCh * 0.001 * hrs * DPy * numRep;
        FEy = FCh * 0.001 * hrs * DPy * numRep;
        ESy = FEy - LEy;
        return ESy;
    }

    function calcTR() {
        tR = FL - Af;
        return tR;
    }

    function calcTLR() {
        calcTR();
        tLR = LL - tR;
        return tLR;
    }

    function calcUsefulFluorescentMoney() {
        Um = (Af / FL) * C;
        return Um;
    }

    function calcWastedFluorescentMoney() {
        calcTR();
        Wm = (tR / FL) * C;
        return Wm;
    }

    function calcXTotalCostSavings() {
        calcTR();
        calcTLR();
        calcCSy();
        calcWastedFluorescentMoney();

        XTCSt = tR * ((CSy / numRep)) - (Wm) + tLR * (CSy / numRep) - CL;
        return XTCSt;
    }

    function calcTubeCostSav() {
        calcXTotalCostSavings();
        var hi;
        hi = calcXTotalCostSavings() / numRep;
        return hi;
    }

    function calcXROI() {
        //something like this;
        calcXTotalCostSavings();
        XROI = CL / (XTCSt / LL);
        return XROI;
    }

    function calcROI() {
        calcCSy();
        ROI = CL / (CSy / numRep);
        return ROI;
    }

    // calculates all values
    function calculateValues(first_time) {
        //double LCh1, double FCh1, double hrs1, double numRep1, double DPy1, double Ec1, 
        //double Af1, double LL1, double FL1, double C1, double CL1
        // can take these as input using html <input> tags
        var inputNames = ['LCh1', 'FCh1', 'hrs1', 'numRep1', 'DPy1', 'Ec1', 'Af1', 'LL1Hrs', 'FL1Hrs', 'C1', 'CL1'];
        for (var i = 0; i < inputNames.length; ++i) {
            var name = inputNames[i];
            eval(name + " = " + $('#' + name).val());
        }
        newInputs(LCh1, FCh1, hrs1, numRep1, DPy1, Ec1, Af1, LL1Hrs, FL1Hrs, C1, CL1);

        if (first_time) {
            updateValues();
        } else {
            shortAnim();
            window.setTimeout(function () {
                $('#results').empty();
                updateValues();
            }, 300);
        }
    }

    function updateValues() {
        $('#results').empty();
        output("Simple ROI:  ", calcROI().toFixed(3));
        output("Complex ROI:  ", calcXROI().toFixed(3));

        output("One Year Energy Reduction for All Tubes:  ", calcESy().toFixed(3) + " kW");


        output("One Year Savings All Tubes (Simple Calculation):  ", formatMoney(calcCSy()));
        output("All Year Savings All Tubes (Simple Calculation) (Costs Accounted For):  ", formatMoney(calcCSy() * LL - (CL * numRep)));


        output("All Years Savings per tube (Complex Formula) (Costs Accounted For):  ", formatMoney(calcXTotalCostSavings()) + " per tube");
        output("All Years Savings All Tubes (Complex Formula) (Costs Accounted For):  ", formatMoney(calcXTotalCostSavings() * numRep));
    }

    $('input').keyup(function () {
        calculateValues(false);
    })

    function startingVals(list) { // init text inputs
        for (var i = 0; i < list.length; ++i)
            $('#inputs label:nth-child(' + (i + 1) + ') input').val(list[i]);
    }

    startingVals([17, 32, 12, 90, 200, 0.09, 2, 36000, 36000, 1.69, 5.92]);
    calculateValues(true);

    function output(name, value) {
        $('#results').append('<p class="result">' + name + '<span>' + value + '</span><\p>');
    }

    function formatMoney(value) {
        return '$' + value.toFixed(2);
    }
})
