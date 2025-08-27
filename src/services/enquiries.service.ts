import EnquiryModel from '@models/enquiries.model';
import { CreateEnquiryDto, UpdateEnquiryDto, UpdateEnquiryStatusDto } from '@dtos/enquiries.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Enquiry } from '@interfaces/enquiries.interface';

class EnquiriesService {
  public async findAllEnquiries(): Promise<Enquiry[]> {
    const enquiries = await EnquiryModel.find();
    return enquiries;
  }

  public async findEnquiryById(enquiryId: string): Promise<Enquiry> {
    if (isEmpty(enquiryId)) throw new HttpException(400, 'EnquiryId is empty');

    const findEnquiry = await EnquiryModel.findOne({ _id: enquiryId });
    if (!findEnquiry) throw new HttpException(409, "Enquiry doesn't exist");

    return findEnquiry;
  }

  public async findEnquiriesByGymId(gymId: string): Promise<Enquiry[]> {
    if (isEmpty(gymId)) throw new HttpException(400, 'GymId is empty');

    const enquiries = await EnquiryModel.find({ gymId: gymId });
    return enquiries;
  }

  public async createEnquiry(enquiryData: CreateEnquiryDto): Promise<Enquiry> {
    if (isEmpty(enquiryData)) throw new HttpException(400, 'enquiryData is empty');

    const createEnquiryData = await EnquiryModel.create({
      ...enquiryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createEnquiryData;
  }

  public async updateEnquiry(enquiryId: string, enquiryData: UpdateEnquiryDto): Promise<Enquiry> {
    if (isEmpty(enquiryData)) throw new HttpException(400, 'enquiryData is empty');

    const updateEnquiryById = await EnquiryModel.findByIdAndUpdate(enquiryId, { ...enquiryData, updatedAt: new Date() }, { new: true });
    if (!updateEnquiryById) throw new HttpException(409, "Enquiry doesn't exist");

    return updateEnquiryById;
  }

  public async deleteEnquiry(enquiryId: string): Promise<Enquiry> {
    const deleteEnquiryById = await EnquiryModel.findByIdAndDelete(enquiryId);
    if (!deleteEnquiryById) throw new HttpException(409, "Enquiry doesn't exist");

    return deleteEnquiryById;
  }

  public async updateEnquiryStatus(statusData: UpdateEnquiryStatusDto): Promise<Enquiry> {
    if (isEmpty(statusData)) throw new HttpException(400, 'statusData is empty');

    const updateEnquiryStatus = await EnquiryModel.findByIdAndUpdate(
      statusData._id,
      { isActive: statusData.isActive, updatedAt: new Date() },
      { new: true },
    );
    if (!updateEnquiryStatus) throw new HttpException(409, "Enquiry doesn't exist");

    return updateEnquiryStatus;
  }
}

export default EnquiriesService;
