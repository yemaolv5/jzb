export type TabType = 'home' | 'orders' | 'coupons' | 'profile';

export type ServiceCategory = 'window' | 'daily' | 'appliance' | 'plumbing' | 'deep';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  tag: string;
  subtitle: string;
  iconName: string;
  badge?: string;
  pricePerUnit: number;
  unit: string;
  calculationType: 'area' | 'hourly' | 'fixed';
  minQuantity?: number;
  defaultQuantity?: number;
  highlightBenefit?: string;
  description: string;
  serviceItems: string[];
  guarantees: string[];
  basePriceCalculation: (quantity: number) => number;
}

export type StaffTier = 'standard' | 'skilled' | 'premium';

export interface StaffTierInfo {
  tier: StaffTier;
  title: string;
  badge: string;
  priceDiff: number; // additional price if any
  features: string[];
  recommended?: boolean;
}

export interface WorkerInfo {
  id: string;
  name: string;
  avatar: string;
  gender: string;
  experienceYears: number;
  servedHouseholds: number;
  rating: number;
  skills: string[];
  certifications: {
    realName: boolean;
    healthCert: boolean;
    insurance: boolean;
    noCriminalRecord: boolean;
    skillCert: boolean;
  };
  phone: string;
  bio: string;
}

export interface UserAddress {
  id: string;
  community: string;
  building: string;
  unit: string;
  room: string;
  area: number; // in m²
  contactName: string;
  phone: string;
  isDefault: boolean;
}

export interface CouponItem {
  id: string;
  title: string;
  amount: number;
  minSpend: number;
  source: string;
  applicableCategory: ServiceCategory | 'all';
  validUntil: string;
  status: 'available' | 'used' | 'expired';
  description: string;
}

export type OrderStatus = 'pending_arrival' | 'in_service' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  orderNumber: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  tier: StaffTier;
  tierTitle: string;
  address: UserAddress;
  quantity: number;
  unit: string;
  scheduledTime: string;
  originalPrice: number;
  discountAmount: number;
  appliedCouponId?: string;
  finalPrice: number;
  status: OrderStatus;
  worker?: WorkerInfo;
  createdAt: string;
  payMethod: 'wechat' | 'property_balance' | 'renewal_benefit';
  hasReviewed?: boolean;
  reviewData?: OrderReview;
}

export interface OrderReview {
  satisfaction: 'satisfied' | 'neutral' | 'unsatisfied';
  tags: string[];
  comment?: string;
  createdAt: string;
}

export interface CommunityGroupBuy {
  communityName: string;
  serviceName: string;
  targetServiceId: string;
  joinedHouseholds: number;
  nextTierHouseholds: number;
  currentDiscount: number; // e.g. 0.95 = 95折
  nextDiscount: number; // e.g. 0.9 = 9折
  deadline: string;
}
