import supabase from './supabase';

import { ISetting } from '../models/ISetting';
import { IUpdateSetting } from '../models/IUpdateSetting';

export async function getSettings(): Promise<ISetting> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return {
    id: data.id,
    minBookingLength: data.min_booking_length,
    maxBookingLength: data.max_booking_length,
    maxGuestsPerBooking: data.max_guests_per_booking,
    breakfastPrice: data.breakfast_price,
    createdAt: new Date(data.created_at),
  };
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(
  setting: IUpdateSetting
): Promise<ISetting> {
  const { data, error } = await supabase
    .from('settings')
    .update({
      min_booking_length: setting.minBookingLength,
      max_booking_length: setting.maxBookingLength,
      max_guests_per_booking: setting.maxGuestsPerBooking,
      breakfast_price: setting.breakfastPrice,
    })
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }

  return {
    id: data.id,
    minBookingLength: data.min_booking_length,
    maxBookingLength: data.max_booking_length,
    maxGuestsPerBooking: data.max_guests_per_booking,
    breakfastPrice: data.breakfast_price,
    createdAt: new Date(data.created_at),
  };
}
