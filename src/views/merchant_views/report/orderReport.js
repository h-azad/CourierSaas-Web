

import {Search} from "react-feather"
import { Table, Button, CardText } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { DatePicker, Space } from 'antd'
import { getApi } from "../../../constants/apiUrls"

const OrderReport = () => {
	const { RangePicker } = DatePicker
	const [rider, setRider] = useState([])


	
	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi())
			.then((res) => {
				console.log(res.data)
				setOrder(res.data)
			}).catch((err) => {
				console.log(err)
			})
	}



	



	useEffect(() => {
		defaultFetchOrderData()
	}, [])




	const fetchSearchRidersData = searchTerm => {
		return useJwt
			// .axiosGet(getApi(RIDER_SEARCH)+'?search='+ searchTerm) //after line
			.axiosGet(getApi(RIDER_SEARCH_FILTER) + '?search=' + searchTerm)
			.then((res) => {
				return res.data
			})
			.catch((err) => console.log(err))
	}

	const handleSearch = debounce(e => {
		console.log(e.target.value)
		const searchTerm = e.target.value
		if (searchTerm.length > 0) {
			fetchSearchRidersData(searchTerm)
				.then(data => {
					if (data.length > 0) {
						console.log('res', data)
						setRider(data)
					} else {
						console.log("No data")
					}
				})
		} else {
			defaultFetchOrderData()
		}

	}, 300)



	function debounce(fn, time) {
		let timeoutId
		return wrapper
		function wrapper(...args) {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
			timeoutId = setTimeout(() => {
				timeoutId = null
				fn(...args)
			}, time)
		}
	}

	return (
		<>
			<CardText>
				<div className="row justify-content-between">
					<div className="col-lg-3">
						<div className="d-flex align-items-center">
							<Button.Ripple color="primary">PDF</Button.Ripple>
						</div>
					</div>

					

					<div className="col-lg-3">
						<div className="d-flex align-items-center ">
						<Space direction="vertical" size={12}>
							<RangePicker />
						</Space>
						</div>
					</div>


					<div className="col-lg-5">
						<div className="d-flex align-items-center ">
							<input
								placeholder="Search Rider"
								name="user_name"
								type="text"
								class="form-control"
								// value=""
								onChange={handleSearch}
							/>
							<Button.Ripple className="btn-icon ms-1" outline color="primary">
								<Search size={16} />
							</Button.Ripple>
						</div>
					</div>
				</div>
			</CardText>
			<div class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Full Name</th>
							<th>Contact Number</th>
							<th>Email</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{rider &&
							rider.map((info) => (
								<tr key={info.id}>
									<td>
										<span className="align-middle fw-bold">{info.full_name}</span>
									</td>
									<td>{info.contact_no}</td>
									<td>{info.email}</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default OrderReport

