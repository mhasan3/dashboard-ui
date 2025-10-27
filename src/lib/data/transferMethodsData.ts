// src/lib/data/transferMethodsData.ts

// Define the structure of the transfer methods for TypeScript safety (optional but recommended)
export interface TransferMethod {
	icon: string;
	iconType?: 'icon';
	bgColor: string;
	title: string;
	subtitle: string;
	isHighlighted?: boolean;
	details: Array<{ label: string; value: string }>;
}

export const transferMethods: TransferMethod[] = [
	{
		icon: 'DDA',
		bgColor: 'bg-yellow-200',
		title: 'DDA',
		subtitle: 'Available in 8 banks of Singapore',
		details: [
			{ label: 'Should Arrive in', value: 'Minutes' },
			{ label: 'Fee', value: 'Free' },
			{ label: 'Advantage', value: 'One-time linkage & Easy depositing.' }
		]
	},
	{
		icon: 'PayNow',
		bgColor: 'bg-yellow-100',
		title: 'PayNow',
		subtitle: 'Support local bank account',
		details: [
			{ label: 'Should Arrive in', value: 'Minutes' },
			{ label: 'Fee', value: 'Free' },
		]
	},
	{
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>`,
		iconType: 'icon',
		bgColor: 'bg-yellow-100',
		title: 'Bank Transfer',
		subtitle: 'Available in SGP and worldwide',
		details: [
			{ label: 'Should Arrive in', value: '2Hrs – 2 business Days' },
			{ label: 'Fee', value: 'Free for SGD local tranfer' },
			{ label: 'Advantage', value: 'Available for Fast, PayNow, TT, etc.' }
		]
	},
	{
		icon: `<svg version="1.1" id="Layer_1" xmlns:x="ns_extend;" xmlns:i="ns_ai;" xmlns:graph="ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 51.1 48.6" style="enable-background:new 0 0 51.1 48.6;" xml:space="preserve">
         <style type="text/css">
         .st0{fill:#163300;}
         </style>
         <metadata>
         <sfw xmlns="ns_sfw;">
          <slices>
          </slices>
          <sliceSourceBounds bottomLeftOrigin="true" height="48.6" width="51.1" x="33.5" y="-211.5">
          </sliceSourceBounds>
         </sfw>
         </metadata>
         <g>
         <path class="st0" d="M13.8,14.6L0,30.8h24.7l2.8-7.6H16.9l6.5-7.5l0-0.2l-4.2-7.2h18.9L23.4,48.6h10L51.1,0H5.4L13.8,14.6
        \t\tL13.8,14.6z">
         </path>
         </g>
        </svg>`,
		iconType: 'icon',
		bgColor: 'bg-purple-50',
		title: 'Transfer with Wise',
		subtitle: 'Available for non-SGP Bank accounts',
		details: [
			{
				label: 'Advantage',
				value: 'One-time linkage & Faster and cheaper Transfer from non-SGP Banks.'
			}
		]
	},
	{
		icon: `<svg viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M7.75178 16.0898H0.972656V22.869H7.75178V16.0898Z" fill="#06FC88"></path>
         <path
           d="M28.1447 0.123375L14.2267 0.0957031V6.04473H18.2388L7.75195 33.2166H15.1122L17.4918 26.9355H31.05L33.3466 33.2166H40.7621L28.1447 0.123375ZM19.4287 20.9865L24.2709 8.06463L29.0301 20.9865H19.4287Z"
           fill="#0E0848"
         ></path>
       </svg>`,
		iconType: 'icon',
		bgColor: 'bg-indigo-200',
		title: 'Pay with Cryptocurrency',
		subtitle: 'Available in SGP and worldwide',
		isHighlighted: true,
		details: [{ label: 'Advantage', value: 'Instant settlement with no bank account needed' }]
	}
];