import React, { useState } from 'react';
import './css/ProductFilterBar.css';
import { ACTION_TYPE } from '../../utils';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useProductData } from '../../contexts/productContext/productContext';

const STARS = [1, 2, 3, 4];

export function ProductFilterBar() {
	const {
		dispatchData,
		sortBy,
		priceRange,
		sortByRating,
		products,
		categories
	} = useProductData();

	const changeHandler = (typeOfDispatch, typeOfAction, e) => {
		dispatchData({
			type: typeOfDispatch,
			payload: typeOfAction
		});
	};

	const isSortByRating = star => sortByRating && sortByRating === star;
	const isSortByPrice = type => sortBy && sortBy === type;

	return (
		<div className="filter-bar">
			<div className="filter-head">
				<h4>Filters</h4>
				<p
					onClick={() => {
						changeHandler(ACTION_TYPE.CLEAR_FILTER, products);
					}}
					className="paragraph-md clr-flt-btn">
					Clear
				</p>
			</div>

			<div className="filter-price">
				<h4>Price</h4>
				<div>
					<div className="price-range">
						<p>100</p>
						<p>500</p>
						<p>1000</p>
					</div>
					<input
						type="range"
						name="rangeInput"
						className="slider"
						min="100"
						max="1000"
						value={priceRange}
						onChange={e =>
							changeHandler(ACTION_TYPE.PRICE_RANGE, e.target.value, e)}
					/>
				</div>
			</div>

			<div className="filter-category">
				<h4>Category</h4>
				<div>
					{categories.map(
						({ categoryName, subCategories, _id, showSubCategories }) => {
							return (
								<div key={_id} className="category">
									<h3
										className="categoryName"
										onClick={() => {
											changeHandler(ACTION_TYPE.SHOW_OR_HIDE_SUBCATEGORIES, {
												_id,
												value: !showSubCategories
											});
										}}>
										{showSubCategories
											? <BiChevronUp className="up-down-icon" />
											: <BiChevronDown className="up-down-icon" />}
										{categoryName}
									</h3>
									{showSubCategories &&
										subCategories.map(({ _id, subCategoryName, ischecked }) => {
											return (
												<div className="select-category">
													<input
														type="checkbox"
														name="light"
														className="checkbox-input"
														checked={ischecked}
														onChange={e =>
															changeHandler(
																ACTION_TYPE.SELECTED_SUBCATEGORY,
																{ subCategoryName, categoryName, chackedValue: !ischecked },
																e
															)}
													/>
													<label key={_id} className="input-label">
														{`${subCategoryName
															.charAt(0)
															.toUpperCase()}${subCategoryName.slice(1)}`}
													</label>
												</div>
											);
										})}
								</div>
							);
						}
					)}
				</div>
			</div>

			<div className="filter-rating">
				<h4>Rating</h4>
				<div>
					{STARS.map(star =>
						<div className="select-category" key={star}>
							<input
								className="checkbox-input"
								type="radio"
								name="rating"
								value=""
								checked={isSortByRating(star) // className="radio-input"
								}
								onChange={() => {
									changeHandler(ACTION_TYPE.SORT_BY_RATING, star);
								}}
							/>
							<label className="input-label">
								{star} Stars & above
							</label>
						</div>
					)}
				</div>
			</div>

			<div className="filter-sort">
				<h4>Sort by</h4>
				<div>
					<div className="select-category">
						<input
							type="radio"
							name="sort"
							className="checkbox-input"
							checked={isSortByPrice('LOW_TO_HIGH')}
							onChange={() => changeHandler(ACTION_TYPE.SORT_BY, 'LOW_TO_HIGH')}
						/>

						<label className="input-label">Price - Low to High</label>
					</div>
					<div className="select-category">
						<input
							type="radio"
							name="sort"
							className="checkbox-input"
							checked={isSortByPrice('HIGH_TO_LOW')}
							onChange={() => changeHandler(ACTION_TYPE.SORT_BY, 'HIGH_TO_LOW')}
						/>
						<label className="input-label">Price - High to Low</label>
					</div>
				</div>
			</div>
		</div>
	);
}
