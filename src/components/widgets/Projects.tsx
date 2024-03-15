"use client";

import {
	GitHubLogoIcon,
	LinkedInLogoIcon,
	PilcrowIcon,
	PlayIcon,
} from "@radix-ui/react-icons";
import Ticker from "framer-motion-ticker";
import { useState } from "react";

const ITEMS = [
	{
		title: "commander",
		description: "Add Commands to every part of Obsidian's user interface",
		links: [
			{
				name: "GitHub",
				url: "https://github.com/phibr0/obsidian-commander",
				icon: <GitHubLogoIcon width={20} height={20} aria-label="GitHub" />,
			},
		],
	},
	{
		title: "your own plugin",
		description: "Learn how to create your own Obsidian plugin",
		links: [
			{
				name: "Medium",
				url: "https://phibr0.medium.com/how-to-create-your-own-obsidian-plugin-53f2d5d44046",
				icon: <PilcrowIcon width={20} height={20} aria-label="Medium" />,
			},
			{
				name: "YouTube",
				url: "https://www.youtube.com/watch?v=XaES2G3PVpg",
				icon: <PlayIcon width={20} height={20} aria-label="YouTube" />,
			},
		],
	},
	{
		title: "collaboration",
		description: "Journey of collaborating on the Commander plugin",
		links: [
			{
				name: "YouTube",
				url: "https://www.youtube.com/watch?v=urkUq26Mf5E",
				icon: <PlayIcon width={20} height={20} aria-label="YouTube" />,
			},
		],
	},
	{
		title: "charts",
		description: "Interactive and animated Charts in Obsidian",
		links: [
			{
				name: "GitHub",
				url: "https://github.com/phibr0/obsidian-charts",
				icon: <GitHubLogoIcon width={20} height={20} aria-label="GitHub" />,
			},
		],
	},
	{
		title: "dictionary",
		description: "A multilingual dictionary for the Obsidian note taking tool",
		links: [
			{
				name: "GitHub",
				url: "https://github.com/phibr0/obsidian-dictionary",
				icon: <GitHubLogoIcon width={20} height={20} aria-label="GitHub" />,
			},
		],
	},
	{
		title: "vit game",
		description:
			"A gamified fitness app made at the hack4pott hackathon by thyssenkrupp",
		links: [
			{
				name: "GitHub",
				url: "https://github.com/phibr0/vit",
				icon: <GitHubLogoIcon width={20} height={20} aria-label="GitHub" />,
			},
			{
				name: "LinkedIn",
				url: "https://www.linkedin.com/posts/thyssenkrupp_hackathon-hack4pott-challenges-activity-7131278174864183296-aO5l/",
				icon: <LinkedInLogoIcon width={20} height={20} aria-label="LinkedIn" />,
			},
		],
	},
];

export const Projects = () => {
	const [playing, setPlaying] = useState(true);
	return (
		<div>
			<Ticker
				duration={60}
				isPlaying={playing}
				onMouseEnter={() => setPlaying(false)}
				onMouseLeave={() => setPlaying(true)}
			>
				{ITEMS.map((item) => (
					<div className="h-40 py-4 text-left px-24" key={item.title}>
						<h3 className="font-serif text-lg font-bold">{item.title}</h3>
						<p className="text-sm text-neutral-500">{item.description}</p>
						<div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 lg:mt-4">
							{item.links.map((link) => (
								<a
									key={link.url}
									href={link.url}
									className="text-neutral-500 hover:text-neutral-400"
								>
									{link.icon}
								</a>
							))}
						</div>
					</div>
				))}
			</Ticker>
		</div>
	);
};
