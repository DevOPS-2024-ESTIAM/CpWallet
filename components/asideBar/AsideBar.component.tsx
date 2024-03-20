"use client"
import React, { useState } from "react"
import Image from "next/image"
import { BsFillHouseFill, BsHousesFill } from "react-icons/bs"
import { RiArrowDropDownLine } from "react-icons/ri"

const AsideBar = (props: any) => {
	const [selectedIndex, setSelectedIndex] = useState(1) 
	const SelectedIndex = () => {
		
	}
	
	

	console.log(selectedIndex)
	return (
		<aside className=" flex flex-col w-1/4 text-primary-50 gap-y-4">
			<div className="flex flex-row items-center h-fit p-4 gap-x-2 bg-primary-100">
				<span>
					<Image
						src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
						alt="user avatar"
						width={60}
						height={60}
						priority
					/>
				</span>
				<p className="basis-2/4 text-primary-300 hidden md:flex">
					<code>username</code>
				</p>
			</div>
			<div>
				<menu type="toolbar" className="text-primary-300 ml-6">
					<ol className="flex flex-col">
						<li className="">
							<div className="rounded-ee-full h-2 shadow-t" />
							<button
								className="flex gap-x-4 items-center rounded-s w-full pl-4 bg-primary-50 
								hover:bg-primary-300"
								onClick={() => setSelectedIndex(1)}
							>
								<BsFillHouseFill />
								<p className=" hidden md:flex">home</p>
								<RiArrowDropDownLine />
							</button>
							<div className="before:content[*]  rounded-se-full h-2 shadow-t" />
						</li>

						<li className="">
							<button
								className="flex gap-x-4 items-center rounded-s  w-full pl-4 bg-primary-50"
								onClick={() => setSelectedIndex(2)}
							>
								<BsHousesFill />
								<p className="hidden md:flex">homes</p>
							</button>
						</li>
					</ol>
				</menu>
			</div>
		</aside>
	)
}

AsideBar.propTypes = {
	
}

export default AsideBar
