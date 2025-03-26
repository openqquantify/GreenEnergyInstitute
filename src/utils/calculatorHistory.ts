
import { supabase } from "./supabase";

// Save calculation history to Supabase
export async function saveCalculationHistory(
  calculationType: string,
  inputData: any,
  results: any
) {
  try {
    const { error } = await supabase
      .from('calculator_history')
      .insert([
        {
          calculation_type: calculationType,
          input_data: inputData,
          results: results,
          user_id: (await supabase.auth.getUser()).data.user?.id
        },
      ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving calculation history:', error);
    return false;
  }
}

// Get user's calculation history
export async function getCalculationHistory() {
  try {
    const { data, error } = await supabase
      .from('calculator_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting calculation history:', error);
    return [];
  }
}
