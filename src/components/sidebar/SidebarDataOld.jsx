// Filename - components/SidebarData.js

import React from "react";
//import * as FaIcons from "react-icons/fa";
//import * as AiIcons from "react-icons/ai";
//import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
	{
		title: "Add",
		path: "/products",
		// icon: <AiIcons.AiFillHome />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		// subNav: [
		// 	{
		// 		title: "Our Aim",
		// 		path: "/about-us/aim",
		// 		icon: <IoIcons.IoIosPaper />,
		// 	},
		// 	{
		// 		title: "Our Vision",
		// 		path: "/about-us/vision",
		// 		icon: <IoIcons.IoIosPaper />,
		// 	},
		// ],
	},
	{
		title: "ProductList",
		path: "/product-list",
		// icon: <IoIcons.IoIosPaper />,
		// iconClosed: <RiIcons.RiArrowDownSFill />,
		// iconOpened: <RiIcons.RiArrowUpSFill />,

		
	},
	{
		title: "Add customer",
		path: "/customer-form",
		// icon: <FaIcons.FaPhone />,
	},
	{
		title: "Reports",
		path: "/events",
		//icon: <FaIcons.FaEnvelopeOpenText />,

		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "CustomerReport",
				path: "/customer-report",
				//icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "ProductReport",
				path: "/product-report",
				//icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "SalesReport",
				path: "/sales-report",
				//icon: <IoIcons.IoIosPaper />,
			}
		],
	},
	// {
	// 	title: "Support",
	// 	path: "/support",
	// 	icon: <IoIcons.IoMdHelpCircle />,
	// },
];
