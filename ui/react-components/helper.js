import {
    DEFAULT_MAX_APPOINTMENT_PROVIDERS, LOCATION,
    minDurationForAppointment, PROVIDER,
    PROVIDER_RESPONSES, SERVICE_TYPE, SPECIALITY
} from "./constants";
import moment from "moment";
import {isEmpty} from "lodash";

export const isSpecialitiesEnabled = appConfig => {
    if (appConfig)
        return appConfig.enableSpecialities;
    return false;
};

export const getDefaultOccurrences = appConfig => {
    if (appConfig && appConfig.recurrence)
        return Number(appConfig.recurrence.defaultNumberOfOccurrences);
};

export const maxAppointmentProvidersAllowed = appConfig => {
    if (appConfig && appConfig.maxAppointmentProviders)
        return appConfig.maxAppointmentProviders;
    return DEFAULT_MAX_APPOINTMENT_PROVIDERS;
};

export const getDuration = (service, serviceType) => (serviceType && serviceType.duration)
    || (service && service.durationMins)
    || minDurationForAppointment;

export const getYesterday = () => {
    return moment().subtract('1', 'days').endOf('day');
};

export const isServiceTypeEnabled = appConfig => {
    return appConfig && appConfig.enableServiceTypes;
};

export const getValidProviders = providers => {
    return providers && providers.filter(provider => provider.response === PROVIDER_RESPONSES.ACCEPTED);
};

export const isMandatory = (appConfig, nameOfTheField)  => {
    return appConfig && appConfig.mandatoryAttributes && !isEmpty(appConfig.mandatoryAttributes.filter(fieldName => fieldName.toLowerCase() === nameOfTheField));
};

export const isMandatoryAndEmpty = (appConfig, fieldName, value) => {
    return isMandatory(appConfig, fieldName) ? isEmpty(value) : false;
};

export const isValidAppointmentDetails = (appConfig, appointmentDetails) => {
    if (!isServiceTypeEnabled(appConfig) && !isSpecialitiesEnabled(appConfig)) {
        return appConfig && appointmentDetails && !isMandatoryAndEmpty(appConfig, LOCATION, appointmentDetails.location) && !isMandatoryAndEmpty(appConfig, PROVIDER, appointmentDetails.providers);
    } else if (isServiceTypeEnabled(appConfig) && !isSpecialitiesEnabled(appConfig)) {
        return appConfig && appointmentDetails && !isMandatoryAndEmpty(appConfig, LOCATION, appointmentDetails.location) && !isMandatoryAndEmpty(appConfig, SERVICE_TYPE, appointmentDetails.serviceType)
            && !isMandatoryAndEmpty(appConfig, PROVIDER, appointmentDetails.providers);
    } else if (!isServiceTypeEnabled(appConfig) && isSpecialitiesEnabled(appConfig)) {
        return appConfig && appointmentDetails && !isMandatoryAndEmpty(appConfig, LOCATION, appointmentDetails.location) && !isMandatoryAndEmpty(appConfig, PROVIDER, appointmentDetails.providers)
            && !isMandatoryAndEmpty(appConfig, SPECIALITY, appointmentDetails.speciality);
    } else {
        return appConfig && appointmentDetails && !isMandatoryAndEmpty(appConfig, LOCATION, appointmentDetails.location) && !isMandatoryAndEmpty(appConfig, SERVICE_TYPE, appointmentDetails.serviceType)
            && !isMandatoryAndEmpty(appConfig, PROVIDER, appointmentDetails.providers) && !isMandatoryAndEmpty(appConfig, SPECIALITY, appointmentDetails.speciality);
    }
};
