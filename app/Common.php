<?php

namespace App;

use App\IC\Audio_Special_Purpose;
use App\IC\ClockTiming_Application_Specific;
use App\IC\ClockTiming_Clock_Buffers_Drivers;
use App\IC\ClockTiming_Clock_Generators_PLLs_Frequency_Synthesizers;
use App\IC\ClockTiming_Delay_Lines;
use App\IC\ClockTiming_IC_Batteries;
use App\IC\ClockTiming_Programmable_Timers_and_Oscillators;
use App\IC\ClockTiming_Real_Time_Clocks;
use App\IC\Data_Acquisition_ADCsDACs_Special_Purpose;
use App\IC\Data_Acquisition_Analog_Front_End_AFE;
use App\IC\Data_Acquisition_Analog_to_Digital_Converters_ADC;
use App\IC\Data_Acquisition_Digital_Potentiometers;
use App\IC\Data_Acquisition_Digital_to_Analog_Converters_DAC;
use App\IC\Data_Acquisition_Touch_Screen_Controllers;
use App\IC\Embedded_CPLDs_Complex_Programmable_Logic_Devices;
use App\IC\Embedded_DSP_Digital_Signal_Processors;
use App\IC\Embedded_FPGAs_Field_Programmable_Gate_Array;
use App\IC\Embedded_FPGAs_Field_Programmable_Gate_Array_with_Microcontrollers;
use App\IC\Embedded_Microcontroller_Microprocessor_FPGA_Modules;
use App\IC\Embedded_Microcontrollers;
use App\IC\Embedded_Microcontrollers_Application_Specific;
use App\IC\Embedded_Microprocessors;
use App\IC\Embedded_PLDs_Programmable_Logic_Device;
use App\IC\Embedded_System_On_Chip_SoC;
use App\IC\Interface_Analog_Switches_Multiplexers_Demultiplexers;
use App\IC\Interface_Analog_Switches_Special_Purpose;
use App\IC\Interface_CODECs;
use App\IC\Interface_Controllers;
use App\IC\Interface_Direct_Digital_Synthesis_DDS;
use App\IC\Interface_Drivers_Receivers_Transceivers;
use App\IC\Interface_Encoders_Decoders_Converters;
use App\IC\Interface_Filters_Active;
use App\IC\Interface_IO_Expanders;
use App\IC\Interface_Modems_ICs_and_Modules;
use App\IC\Interface_Modules;
use App\IC\Interface_Sensor_and_Detector_Interfaces;
use App\IC\Interface_Sensor_Capacitive_Touch;
use App\IC\Interface_Serializers_Deserializers;
use App\IC\Interface_Signal_Buffers_Repeaters_Splitters;
use App\IC\Interface_Signal_Terminators;
use App\IC\Interface_Specialized;
use App\IC\Interface_Telecom;
use App\IC\Interface_UARTs_Universal_Asynchronous_Receiver_Transmitter;
use App\IC\Interface_Voice_Record_and_Playback;
use App\IC\Linear_Amplifiers_Audio;
use App\IC\Linear_Amplifiers_Instrumentation_OP_Amps_Buffer_Amps;
use App\IC\Linear_Amplifiers_Special_Purpose;
use App\IC\Linear_Amplifiers_Video_Amps_and_Modules;
use App\IC\Linear_Analog_Multipliers_Dividers;
use App\IC\Linear_Comparators;
use App\IC\Linear_Video_Processing;
use App\IC\Logic_Buffers_Drivers_Receivers_Transceivers;
use App\IC\Logic_Comparators;
use App\IC\Logic_Counters_Dividers;
use App\IC\Logic_FIFOs_Memory;
use App\IC\Logic_Flip_Flops;
use App\IC\Logic_Gates_and_Inverters;
use App\IC\Logic_Gates_and_Inverters_MultiFunction_Configurable;
use App\IC\Logic_Latches;
use App\IC\Logic_Multivibrators;
use App\IC\Logic_Parity_Generators_and_Checkers;
use App\IC\Logic_Shift_Registers;
use App\IC\Logic_Signal_Switches_Multiplexers_Decoders;
use App\IC\Logic_Specialty_Logic;
use App\IC\Logic_Translators_Level_Shifters;
use App\IC\Logic_Universal_Bus_Functions;
use App\IC\Memory;
use App\IC\Memory_Batteries;
use App\IC\Memory_Configuration_Proms_for_FPGAs;
use App\IC\Memory_Controllers;
use App\IC\PMIC_AC_DC_Converters_Offline_Switchers;
use App\IC\PMIC_Battery_Chargers;
use App\IC\PMIC_Battery_Management;
use App\IC\PMIC_Current_RegulationManagement;
use App\IC\PMIC_Display_Drivers;
use App\IC\PMIC_Energy_Metering;
use App\IC\PMIC_Full_HalfBridge_Drivers;
use App\IC\PMIC_Gate_Drivers;
use App\IC\PMIC_Hot_Swap_Controllers;
use App\IC\PMIC_Laser_Drivers;
use App\IC\PMIC_LED_Drivers;
use App\IC\PMIC_Lighting_Ballast_Controllers;
use App\IC\PMIC_Motor_Drivers_Controllers;
use App\IC\PMIC_OR_Controllers_Ideal_Diodes;
use App\IC\PMIC_PFC_Power_Factor_Correction;
use App\IC\PMIC_Power_Distribution_Switches_Load_Drivers;
use App\IC\PMIC_Power_Management_Specialized;
use App\IC\PMIC_Power_Over_Ethernet_PoE_Controllers;
use App\IC\PMIC_Power_Supply_Controllers_Monitors;
use App\IC\PMIC_RMS_to_DC_Converters;
use App\IC\PMIC_Supervisors;
use App\IC\PMIC_Thermal_Management;
use App\IC\PMIC_VF_and_FV_Converters;
use App\IC\PMIC_Voltage_Reference;
use App\IC\PMIC_Voltage_Regulators_DC_DC_Switching_Controllers;
use App\IC\PMIC_Voltage_Regulators_DC_DC_Switching_Regulators;
use App\IC\PMIC_Voltage_Regulators_Linear;
use App\IC\PMIC_Voltage_Regulators_Linear_Regulator_Controllers;
use App\IC\PMIC_Voltage_Regulators_Linear_Switching;
use App\IC\PMIC_Voltage_Regulators_Special_Purpose;
use App\IC\Specialized_ICs;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;


class Common extends Model
{
    use RelationshipsTrait;

    public $fillable = ['id','quantity_available','minimum_quantity','component_id','model_id','unit_price','datasheet','ld_image'];
    public function __construct(array $attributes = null)
    {
        if($attributes !== null){
            $this->fillable = Schema::getColumnListing('commons');
            parent::__construct($attributes);
        }

    }

    public function component(){

        return $this->belongsTo(Component::class);
    }


    public function Audio_Special_Purpose(){

        return $this->hasOne(Audio_Special_Purpose::class);
    }

    public function ClockTiming_Application_Specific(){

        return $this->hasOne(ClockTiming_Application_Specific::class);
    }
    public function ClockTiming_Clock_Buffers_Drivers(){

        return $this->hasOne(ClockTiming_Clock_Buffers_Drivers::class);
    }
    public function ClockTiming_Clock_Generators_PLLs_Frequency_Synthesizers(){

        return $this->hasOne(ClockTiming_Clock_Generators_PLLs_Frequency_Synthesizers::class);
    }
    public function ClockTiming_Delay_Lines(){

        return $this->hasOne(ClockTiming_Delay_Lines::class);
    }

    public function ClockTiming_IC_Batteries(){

        return $this->hasOne(ClockTiming_IC_Batteries::class);
    }
    public function ClockTiming_Programmable_Timers_and_Oscillators(){

        return $this->hasOne(ClockTiming_Programmable_Timers_and_Oscillators::class);
    }
    public function ClockTiming_Real_Time_Clocks(){

        return $this->hasOne(ClockTiming_Real_Time_Clocks::class);
    }
    public function Data_Acquisition_ADCsDACs_Special_Purpose(){

        return $this->hasOne(Data_Acquisition_ADCsDACs_Special_Purpose::class);
    }
    public function Data_Acquisition_Analog_Front_End_AFE(){

        return $this->hasOne(Data_Acquisition_Analog_Front_End_AFE::class);
    }
    public function Data_Acquisition_Analog_to_Digital_Converters_ADC(){

        return $this->hasOne(Data_Acquisition_Analog_to_Digital_Converters_ADC::class);
    }
    public function Data_Acquisition_Digital_Potentiometers(){

        return $this->hasOne(Data_Acquisition_Digital_Potentiometers::class);
    }
    public function Data_Acquisition_Digital_to_Analog_Converters_DAC(){

        return $this->hasOne(Data_Acquisition_Digital_to_Analog_Converters_DAC::class);
    }
    public function Data_Acquisition_Touch_Screen_Controllers(){

        return $this->hasOne(Data_Acquisition_Touch_Screen_Controllers::class);
    }

    public function Embedded_CPLDs_Complex_Programmable_Logic_Devices(){

        return $this->hasOne(Embedded_CPLDs_Complex_Programmable_Logic_Devices::class);
    }
    public function Embedded_DSP_Digital_Signal_Processors(){

        return $this->hasOne(Embedded_DSP_Digital_Signal_Processors::class);
    }
    public function Embedded_FPGAs_Field_Programmable_Gate_Array(){

        return $this->hasOne(Embedded_FPGAs_Field_Programmable_Gate_Array::class);
    }
    public function Embedded_FPGAs_Field_Programmable_Gate_Array_with_Microcontrollers(){

        return $this->hasOne(Embedded_FPGAs_Field_Programmable_Gate_Array_with_Microcontrollers::class);
    }
    public function Embedded_Microcontroller_Microprocessor_FPGA_Modules(){

        return $this->hasOne(Embedded_Microcontroller_Microprocessor_FPGA_Modules::class);
    }
    public function Embedded_Microcontrollers(){

        return $this->hasOne(Embedded_Microcontrollers::class);
    }
    public function Embedded_Microcontrollers_Application_Specific(){

        return $this->hasOne(Embedded_Microcontrollers_Application_Specific::class);
    }
    public function Embedded_Microprocessors(){

        return $this->hasOne(Embedded_Microprocessors::class);
    }
    public function Embedded_PLDs_Programmable_Logic_Device(){

        return $this->hasOne(Embedded_PLDs_Programmable_Logic_Device::class);
    }
    public function Embedded_System_On_Chip_SoC(){

        return $this->hasOne(Embedded_System_On_Chip_SoC::class);
    }

    public function Interface_Analog_Switches_Multiplexers_Demultiplexers(){

        return $this->hasOne(Interface_Analog_Switches_Multiplexers_Demultiplexers::class);
    }

    public function Interface_Analog_Switches_Special_Purpose(){

        return $this->hasOne(Interface_Analog_Switches_Special_Purpose::class);
    }

    public function Interface_CODECs(){

        return $this->hasOne(Interface_CODECs::class);
    }

    public function Interface_Controllers(){

        return $this->hasOne(Interface_Controllers::class);
    }
    public function Interface_Direct_Digital_Synthesis_DDS(){

        return $this->hasOne(Interface_Direct_Digital_Synthesis_DDS::class);
    }
    public function Interface_Drivers_Receivers_Transceivers(){

        return $this->hasOne(Interface_Drivers_Receivers_Transceivers::class);
    }
    public function Interface_Encoders_Decoders_Converters(){

        return $this->hasOne(Interface_Encoders_Decoders_Converters::class);
    }
    public function Interface_Filters_Active(){

        return $this->hasOne(Interface_Filters_Active::class);
    }
    public function Interface_IO_Expanders(){

        return $this->hasOne(Interface_IO_Expanders::class);
    }

    public function Interface_Modems_ICs_and_Modules(){

        return $this->hasOne(Interface_Modems_ICs_and_Modules::class);
    }
    public function Interface_Modules(){

    return $this->hasOne(Interface_Modules::class);
    }
    public function Interface_Sensor_and_Detector_Interfaces(){

        return $this->hasOne(Interface_Sensor_and_Detector_Interfaces::class);
    }
    public function Interface_Sensor_Capacitive_Touch(){

        return $this->hasOne(Interface_Sensor_Capacitive_Touch::class);
    }
    public function Interface_Serializers_Deserializers(){

        return $this->hasOne(Interface_Serializers_Deserializers::class);
    }
    public function Interface_Signal_Buffers_Repeaters_Splitters(){

        return $this->hasOne(Interface_Signal_Buffers_Repeaters_Splitters::class);
    }
    public function Interface_Signal_Terminators(){

        return $this->hasOne(Interface_Signal_Terminators::class);
    }
    public function Interface_Specialized(){

        return $this->hasOne(Interface_Specialized::class);
    }
    public function Interface_Telecom(){

        return $this->hasOne(Interface_Telecom::class);
    }
    public function Interface_UARTs_Universal_Asynchronous_Receiver_Transmitter(){

        return $this->hasOne(Interface_UARTs_Universal_Asynchronous_Receiver_Transmitter::class);
    }
    public function Interface_Voice_Record_and_Playback(){

        return $this->hasOne(Interface_Voice_Record_and_Playback::class);
    }
    public function Linear_Amplifiers_Audio(){

        return $this->hasOne(Linear_Amplifiers_Audio::class);
    }
    public function Linear_Amplifiers_Instrumentation_OP_Amps_Buffer_Amps(){

        return $this->hasOne(Linear_Amplifiers_Instrumentation_OP_Amps_Buffer_Amps::class);
    }
    public function Linear_Amplifiers_Special_Purpose(){

        return $this->hasOne(Linear_Amplifiers_Special_Purpose::class);
    }
    public function Linear_Amplifiers_Video_Amps_and_Modules(){

        return $this->hasOne(Linear_Amplifiers_Video_Amps_and_Modules::class);
    }
    public function Linear_Analog_Multipliers_Dividers(){

        return $this->hasOne(Linear_Analog_Multipliers_Dividers::class);
    }
    public function Linear_Comparators(){

        return $this->hasOne(Linear_Comparators::class);
    }
    public function Linear_Video_Processing(){

        return $this->hasOne(Linear_Video_Processing::class);
    }
    public function Logic_Buffers_Drivers_Receivers_Transceivers(){

        return $this->hasOne(Logic_Buffers_Drivers_Receivers_Transceivers::class);
    }
    public function Logic_Comparators(){

        return $this->hasOne(Logic_Comparators::class);
    }
    public function Logic_Counters_Dividers(){

        return $this->hasOne(Logic_Counters_Dividers::class);
    }
    public function Logic_FIFOs_Memory(){

        return $this->hasOne(Logic_FIFOs_Memory::class);
    }
    public function Logic_Flip_Flops(){

        return $this->hasOne(Logic_Flip_Flops::class);
    }
    public function Logic_Gates_and_Inverters(){

        return $this->hasOne(Logic_Gates_and_Inverters::class);
    }
    public function Logic_Gates_and_Inverters_MultiFunction_Configurable(){

        return $this->hasOne(Logic_Gates_and_Inverters_MultiFunction_Configurable::class);
    }
    public function Logic_Latches(){

        return $this->hasOne(Logic_Latches::class);
    }
    public function Logic_Multivibrators(){

        return $this->hasOne(Logic_Multivibrators::class);
    }
    public function Logic_Parity_Generators_and_Checkers(){

        return $this->hasOne(Logic_Parity_Generators_and_Checkers::class);
    }
    public function Logic_Shift_Registers(){

        return $this->hasOne(Logic_Shift_Registers::class);
    }
    public function Logic_Signal_Switches_Multiplexers_Decoders(){

        return $this->hasOne(Logic_Signal_Switches_Multiplexers_Decoders::class);
    }
    public function Logic_Specialty_Logic(){

        return $this->hasOne(Logic_Specialty_Logic::class);
    }
    public function Logic_Translators_Level_Shifters(){

        return $this->hasOne(Logic_Translators_Level_Shifters::class);
    }
    public function Logic_Universal_Bus_Functions(){

        return $this->hasOne(Logic_Universal_Bus_Functions::class);
    }
    public function Memory(){

        return $this->hasOne(Memory::class);
    }
    public function Memory_Batteries(){

        return $this->hasOne(Memory_Batteries::class);
    }
    public function Memory_Configuration_Proms_for_FPGAs(){

        return $this->hasOne(Memory_Configuration_Proms_for_FPGAs::class);
    }
    public function Memory_Controllers(){

        return $this->hasOne(Memory_Controllers::class);
    }
    public function PMIC_AC_DC_Converters_Offline_Switchers(){

        return $this->hasOne(PMIC_AC_DC_Converters_Offline_Switchers::class);
    }
    public function PMIC_Battery_Chargers(){

        return $this->hasOne(PMIC_Battery_Chargers::class);
    }

    public function PMIC_Battery_Management(){

        return $this->hasOne(PMIC_Battery_Management::class);
    }

    public function PMIC_Current_RegulationManagement(){

        return $this->hasOne(PMIC_Current_RegulationManagement::class);
    }

    public function PMIC_Display_Drivers(){

        return $this->hasOne(PMIC_Display_Drivers::class);
    }

    public function PMIC_Energy_Metering(){

        return $this->hasOne(PMIC_Energy_Metering::class);
    }

    public function PMIC_Full_HalfBridge_Drivers(){

        return $this->hasOne(PMIC_Full_HalfBridge_Drivers::class);
    }

    public function PMIC_Gate_Drivers(){

        return $this->hasOne(PMIC_Gate_Drivers::class);
    }

    public function PMIC_Hot_Swap_Controllers(){

        return $this->hasOne(PMIC_Hot_Swap_Controllers::class);
    }

    public function PMIC_Laser_Drivers(){

        return $this->hasOne(PMIC_Laser_Drivers::class);
    }
    public function PMIC_LED_Drivers(){

        return $this->hasOne(PMIC_LED_Drivers::class);
    }
    public function PMIC_Lighting_Ballast_Controllers(){

        return $this->hasOne(PMIC_Lighting_Ballast_Controllers::class);
    }
    public function PMIC_Motor_Drivers_Controllers(){

    return $this->hasOne(PMIC_Motor_Drivers_Controllers::class);
    }
    public function PMIC_OR_Controllers_Ideal_Diodes(){

        return $this->hasOne(PMIC_OR_Controllers_Ideal_Diodes::class);
    }
    public function PMIC_PFC_Power_Factor_Correction(){

        return $this->hasOne(PMIC_PFC_Power_Factor_Correction::class);
    }
    public function PMIC_Power_Distribution_Switches_Load_Drivers(){

        return $this->hasOne(PMIC_Power_Distribution_Switches_Load_Drivers::class);
    }
    public function PMIC_Power_Management_Specialized(){

        return $this->hasOne(PMIC_Power_Management_Specialized::class);
    }
    public function PMIC_Power_Over_Ethernet_PoE_Controllers(){

        return $this->hasOne(PMIC_Power_Over_Ethernet_PoE_Controllers::class);
    }
    public function PMIC_Power_Supply_Controllers_Monitors(){

        return $this->hasOne(PMIC_Power_Supply_Controllers_Monitors::class);
    }
    public function PMIC_RMS_to_DC_Converters(){

        return $this->hasOne(PMIC_RMS_to_DC_Converters::class);
    }
    public function PMIC_Supervisors(){

        return $this->hasOne(PMIC_Supervisors::class);
    }
    public function PMIC_Thermal_Management(){

        return $this->hasOne(PMIC_Thermal_Management::class);
    }
    public function PMIC_VF_and_FV_Converters(){

        return $this->hasOne(PMIC_VF_and_FV_Converters::class);
    }
    public function PMIC_Voltage_Reference(){

        return $this->hasOne(PMIC_Voltage_Reference::class);
    }
    public function PMIC_Voltage_Regulators_DC_DC_Switching_Controllers(){

        return $this->hasOne(PMIC_Voltage_Regulators_DC_DC_Switching_Controllers::class);
    }
    public function PMIC_Voltage_Regulators_DC_DC_Switching_Regulators(){

        return $this->hasOne(PMIC_Voltage_Regulators_DC_DC_Switching_Regulators::class);
    }
    public function PMIC_Voltage_Regulators_Linear(){

        return $this->hasOne(PMIC_Voltage_Regulators_Linear::class);
    }
    public function PMIC_Voltage_Regulators_Linear_Regulator_Controllers(){

        return $this->hasOne(PMIC_Voltage_Regulators_Linear_Regulator_Controllers::class);
    }
    public function PMIC_Voltage_Regulators_Linear_Switching(){

        return $this->hasOne(PMIC_Voltage_Regulators_Linear_Switching::class);
    }
    public function PMIC_Voltage_Regulators_Special_Purpose(){

        return $this->hasOne(PMIC_Voltage_Regulators_Special_Purpose::class);
    }
    public function Specialized_ICs(){

        return $this->hasOne(Specialized_ICs::class);
    }


}
