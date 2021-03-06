import './Locations.scss';
import Location from './Location/Location';
import { FormikProvider, useFormik } from 'formik';
import { useLocations } from './useLocations';
import FormikSearchInputField from 'components/form/search/FormikSearchInputField';
import { useDebounce } from 'utils/hooks/useDebounce';

const Locations = () => {
	const formik = useFormik({
		initialValues: {
			name: '',
		},
		onSubmit: () => {},
		enableReinitialize: true,
	});
	const { values } = formik;
	const debouncedValues = {
		...values,
		name: useDebounce(values.name),
	};

	const { locations } = useLocations(debouncedValues);

	return (
		<div className="locations">
			<div className="container">
				<div className="locations__filter">
					<FormikProvider value={formik}>
						<span>Search by Location Name:</span>
						<FormikSearchInputField className="locations__filter-search" name="name" />
					</FormikProvider>
				</div>

				<div className="locations__locations-grid">
					{locations?.map((location) => (
						<Location key={location.id} {...location} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Locations;
