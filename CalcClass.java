
public class CalcClass {
	//INPUT VARIABLES
	double LCh; //[LED Energy Consumption / Hour]
	double FCh; //[Fluorescent Energy Consumption / Hour]

	//Non light-type INPUT VARIABLES
	double hrs; //[Hours Used / Day] 
	double numRep; //[Number of Tubes Replaced]
	double DPy; //[Days Used / Year]
	double Ec; //[Energy Cost / kWh]
	
	double FLHrs;
	double LLHrs;
	
	//COMPLEX INPUT VARIABLES
	double Af; //Age of Fluorescent
	double LL; //LED Lifespan
	double FL; //Fluorescent Lifespan

	double C; //Cost of Single Fluorescent Tube
	double CL; //Cost of a Single LED Tube
	
	public CalcClass(double LCh1, double FCh1, double hrs1, double numRep1, double DPy1, double Ec1, double Af1, double LL1Hrs, double FL1Hrs, double C1, double CL1){ 
		LCh = LCh1; //[LED Energy Consumption / Hour]
		FCh = FCh1; //[Fluorescent Energy Consumption / Hour]

		//Non light-type INPUT VARIABLES
		hrs = hrs1; //[Hours Used / Day] 
		numRep = numRep1; //[Number of Tubes Replaced]
		DPy = DPy1; //[Days Used / Year]
		Ec = Ec1; //[Energy Cost / kWh]
		
		Af = Af1; 
		LL = (LL1Hrs / hrs) / (DPy);
		System.out.println(LL);
		FL = (FL1Hrs / hrs) / (DPy);
		C = C1;
		CL = CL1;
		
	}


	//OUTPUT VARIABLES	
	double LEy; //Yearly Energy Consumption of LED Tube
	double LCy; //Yearly Energy Cost of LED Tubes

	double FEy; //Yearly Energy Consumption of Fluorescent Tube
	double FCy; //Yearly Energy Cost of Fluorescent Tubes

	double LCEy; //Yearly Carbon Emission of LED Tubes
	double FCEy; //Yearly Carbon Emission of Fluorescent Tubes

	double CESy; //Yearly Carbon Emission Reduction

	//***************************************************** 
		//Variables for more complex calculations.

	//OUTPUT VARIABLES
	double tLR; //Time remaining in LED lifespan after Tr
	double tR; //Time remaining in Fluorescent lifespan
	double Um; //Total Useful Money of a Fluorescent Tube
	double Wm; //Total Wasted Money of a Fluorescent Tube
	
	//FINAL OUTPUTS
	double ESy; //Yearly Energy Savings for all tubes
	double CSy; //Yearly Cost Savings for all tubes
	double XTCSt; //Total Savings per Tube using Complex Formula
	double XROI; //Complex ROI
	double ROI;	 // Simple ROI

	public double calcFL(){
		FL = (FLHrs / hrs) * (DPy / 365);
		return FL;
	}
	
	public double calcLL(){
		LL = (LLHrs / hrs) * (DPy / 365);
		return LL;
	}
	

	public double calcCSy(){
		
	//[LED Energy Consumption / Hour] * [0.001 (for kWh conversion)] * [Hours Used / Day] * [Days Used / Year] * [Number of Tubes Replaced]
	//[Fluorescent Energy Consumption / Hour] * [0.001 (for kWh conversion)] * [Hours Used / Day] * [Days Used / Year] * [Number of Tubes Replaced]
	LEy = LCh * 0.001 * hrs * DPy * numRep;
	LCy = Ec * LEy;

	FEy = FCh * 0.001 * hrs * DPy * numRep;
	FCy = Ec * FEy;
	CSy = FCy - LCy;
	return CSy;
	}
	 
	public double calcESy(){
		LEy = LCh * 0.001 * hrs * DPy * numRep;
		FEy = FCh * 0.001 * hrs * DPy * numRep;
		ESy = FEy - LEy;
		return ESy;
		}

	public double calcTR(){
		tR = FL - Af;
		return tR;
	}

	public double calcTLR(){
		calcTR();
		tLR = LL - tR;
		return tLR;
	}

	public double calcUsefulFluorescentMoney(){
		 Um = (Af / FL) * C;
		 return Um;
	}

	public double calcWastedFluorescentMoney(){
		calcTR();
		 Wm = (tR / FL) * C;
		 return Wm;
	}

	public double calcXTotalCostSavings(){
		calcTR();
		calcTLR();
		calcCSy();
		calcWastedFluorescentMoney();

		XTCSt = tR * ((CSy / numRep)) - (Wm) +  tLR * ( CSy / numRep ) - CL;
		return XTCSt;
	}
	
	public double calcTubeCostSav(){
		calcXTotalCostSavings();
		double hi;
		hi = calcXTotalCostSavings() / numRep;
		return hi;
	}

	public double calcXROI(){
		//something like this;
		calcXTotalCostSavings();
		XROI = CL / (XTCSt / LL);
		return XROI;
	}
	public double calcROI(){
		calcCSy();
		ROI = CL / (CSy / numRep);
		return ROI;
	}
}
