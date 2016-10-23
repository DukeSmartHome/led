
public class MainCalculations {


public static void main(String[] args) {	
	//double LCh1, double FCh1, double hrs1, double numRep1, double DPy1, double Ec1, 
	//double Af1, double LL1, double FL1, double C1, double CL1
	CalcClass calcBro = new CalcClass(17, 32, 12, 90, 200, 0.09, 2, 36000, 36000, 1.69, 5.92);
	
	System.out.print("Simple ROI  " + calcBro.calcROI() + "\n");
	System.out.println("Complex ROI  " + calcBro.calcXROI() + "\n");
	
	System.out.println("One Year Energy Reduction for All Tubes  " + calcBro.calcESy() + "kW" + "\n");
	
	
	System.out.println("One Year Savings All Tubes (Simple Calculation)  $" + calcBro.calcCSy());
	System.out.println("All Year Savings All Tubes (Simple Calculation) (Costs Accounted For)  $" + (calcBro.calcCSy() * calcBro.LL - (calcBro.CL * calcBro.numRep)) + "\n");
	
	
	System.out.print("All Years Savings per tube (Complex Formula) (Costs Accounted For)  $" + calcBro.calcXTotalCostSavings() + " per tube" + "\n");
	System.out.println("All Years Savings All Tubes (Complex Formula) (Costs Accounted For)  $" + calcBro.calcXTotalCostSavings() * calcBro.numRep + "\n" );

	}
}



