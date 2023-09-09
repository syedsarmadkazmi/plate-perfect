import { View } from "react-native"
import { TabNavigator } from "../../navigation/TabNavigator"
import { GStyles } from "~theme"
import { Box } from "native-base"
import { FiltersModal, TextInput } from "~components"
import React, { useEffect, useState } from "react"
import { getTags } from "~services"
import { updateTags } from "~redux"
import { useDispatch } from "react-redux"


export function Search() {
	const [modalVisible, setModalVisible] = useState(false)
	const [value, setValue] = useState("")
	const handleChange = text => setValue(text)

	const dispatch = useDispatch()

	//fetch filter tags on app opened
	useEffect(() => {
		dispatch(updateTags(getTags()))
	}, [])

	const fetchResults = async () => {
		console.log("fetch results for ", value)
	} 

	return (
		<View style={GStyles.container}>
			<Box position={"absolute"} top={12} width={"100%"} zIndex={10000}>
				<TextInput 
					value={value}
					onChangeText={handleChange}
					placeholder="Search"
					onClear={() => setValue("")}
					onFilter={() => setModalVisible(true)}
					onSubmitEditing={fetchResults}
				/>
			</Box>
			<TabNavigator/>
			<FiltersModal title="Recipe Filters" visible={modalVisible} onClose={() => setModalVisible(false)} />
		</View>
	)
}